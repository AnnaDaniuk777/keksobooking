import { DEFAULT_COORDS, MAP_ZOOM } from '../data.js';

export const mapModule = (() => {
  let map;
  let marker;
  let addressField;
  let isMapLoaded = false;

  const initMap = () => new Promise((resolve, reject) => {
    addressField = document.getElementById('address');

    if (typeof ymaps === 'undefined') {
      reject(new Error('Yandex Maps API not loaded'));
      return;
    }

    ymaps.ready(() => {
      try {
        map = new ymaps.Map('map-canvas', {
          center: [DEFAULT_COORDS.lat, DEFAULT_COORDS.lng],
          zoom: MAP_ZOOM,
          controls: ['zoomControl']
        });

        marker = new ymaps.Placemark(
          [DEFAULT_COORDS.lat, DEFAULT_COORDS.lng],
          {},
          {
            draggable: true,
            preset: 'islands#icon',
            iconColor: '#ff5635'
          }
        );

        map.geoObjects.add(marker);
        updateAddressField(DEFAULT_COORDS.lat, DEFAULT_COORDS.lng);

        marker.events.add('dragend', () => {
          const coords = marker.geometry.getCoordinates();
          updateAddressField(coords[0], coords[1]);
        });

        map.events.add('click', (e) => {
          if (isPageActive()) {
            const coords = e.get('coords');
            marker.geometry.setCoordinates(coords);
            updateAddressField(coords[0], coords[1]);
          }
        });

        isMapLoaded = true;
        togglePageState(true);
        resolve(map);

      } catch (error) {
        reject(error);
      }
    });
  });

  function updateAddressField(lat, lng) {
    const formattedLat = lat.toFixed(5);
    const formattedLng = lng.toFixed(5);
    if (addressField) {
      addressField.value = `${formattedLat}, ${formattedLng}`;
    }
  }

  const getCurrentCoords = () => {
    if (!marker) {
      return DEFAULT_COORDS;
    }

    const coords = marker.geometry.getCoordinates();
    return {
      lat: parseFloat(coords[0].toFixed(5)),
      lng: parseFloat(coords[1].toFixed(5))
    };
  };

  const setCoords = (lat, lng) => {
    if (marker) {
      marker.geometry.setCoordinates([lat, lng]);
      map.setCenter([lat, lng], map.getZoom());
      updateAddressField(lat, lng);
    }
  };

  function togglePageState(isActive) {
    const adForm = document.querySelector('.ad-form');
    const mapFilters = document.querySelector('.map__filters');
    const allFieldsets = document.querySelectorAll('fieldset');
    const filterElements = document.querySelectorAll('.map__filters select, .map__filters input');
    const slider = document.querySelector('.ad-form__slider');

    if (adForm) {
      adForm.classList.toggle('ad-form--disabled', !isActive);
    }

    if (mapFilters) {
      mapFilters.classList.toggle('map__filters--disabled', !isActive);
    }

    allFieldsets.forEach((fieldset) => {
      fieldset.disabled = !isActive;
    });

    filterElements.forEach((element) => {
      element.disabled = !isActive;
    });

    if (slider) {
      slider.style.opacity = isActive ? '1' : '0.5';
      slider.style.pointerEvents = isActive ? 'auto' : 'none';
    }

    if (marker) {
      marker.options.set('draggable', isActive);
    }
  }

  function isPageActive() {
    const adForm = document.querySelector('.ad-form');
    return adForm && !adForm.classList.contains('ad-form--disabled');
  }

  const getMapLoadStatus = () => isMapLoaded;

  const getMap = () => map;

  const resetMap = () => {
    if (marker) {
      marker.geometry.setCoordinates([DEFAULT_COORDS.lat, DEFAULT_COORDS.lng]);
      map.setCenter([DEFAULT_COORDS.lat, DEFAULT_COORDS.lng], MAP_ZOOM);
      updateAddressField(DEFAULT_COORDS.lat, DEFAULT_COORDS.lng);
    }
  };

  return {
    initMap,
    getCurrentCoords,
    setCoords,
    togglePageState,
    getMapLoadStatus,
    getMap,
    resetMap
  };
})();
