import { DEFAULT_COORDS } from './data.js';
import { MAP_ZOOM, TILE_LAYER_URL, TILE_LAYER_ATTRIBUTION } from '../data.js';

export const mapModule = (() => {
  let map;
  let marker;
  let addressField;
  let isMapLoaded = false;

  const initMap = () => {
    addressField = document.getElementById('address');

    map = L.map('map-canvas');

    map.on('load', () => {
      isMapLoaded = true;
      togglePageState(true);
    });

    map.setView([DEFAULT_COORDS.lat, DEFAULT_COORDS.lng], MAP_ZOOM);

    L.tileLayer(TILE_LAYER_URL, {
      attribution: TILE_LAYER_ATTRIBUTION
    }).addTo(map);

    const defaultIcon = L.icon({
      iconUrl: 'vendor/leaflet/images/marker-icon.png',
      shadowUrl: 'vendor/leaflet/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    marker = L.marker([DEFAULT_COORDS.lat, DEFAULT_COORDS.lng], {
      draggable: true,
      icon: defaultIcon
    }).addTo(map);

    updateAddressField(DEFAULT_COORDS.lat, DEFAULT_COORDS.lng);

    marker.on('dragend', () => {
      const position = marker.getLatLng();
      updateAddressField(position.lat, position.lng);
    });

    map.on('click', (evt) => {
      if (isPageActive()) {
        marker.setLatLng(evt.latlng);
        updateAddressField(evt.latlng.lat, evt.latlng.lng);
      }
    });

    togglePageState(false);

    return map;
  };

  function updateAddressField(lat, lng) {
    const formattedLat = lat.toFixed(5);
    const formattedLng = lng.toFixed(5);
    addressField.value = `${formattedLat}, ${formattedLng}`;
  }

  const getCurrentCoords = () => {
    if (!marker) {
      return DEFAULT_COORDS;
    }

    const position = marker.getLatLng();

    return {
      lat: parseFloat(position.lat.toFixed(5)),
      lng: parseFloat(position.lng.toFixed(5))
    };
  };

  const setCoords = (lat, lng) => {
    if (marker) {
      marker.setLatLng([lat, lng]);
      map.setView([lat, lng], map.getZoom());
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
      if (isActive) {
        slider.style.opacity = '1';
        slider.style.pointerEvents = 'auto';
      } else {
        slider.style.opacity = '0.5';
        slider.style.pointerEvents = 'none';
      }
    }

    if (marker) {
      if (isActive) {
        marker.dragging.enable();
      } else {
        marker.dragging.disable();
      }
    }
  }

  function isPageActive() {
    const adForm = document.querySelector('.ad-form');

    return !adForm.classList.contains('ad-form--disabled');
  }

  const getMapLoadStatus = () => isMapLoaded;

  const resetMap = () => {
    if (marker) {
      marker.setLatLng([DEFAULT_COORDS.lat, DEFAULT_COORDS.lng]);
      map.setView([DEFAULT_COORDS.lat, DEFAULT_COORDS.lng], 12);
      updateAddressField(DEFAULT_COORDS.lat, DEFAULT_COORDS.lng);
    }
  };

  return {
    initMap,
    getCurrentCoords,
    setCoords,
    togglePageState,
    getMapLoadStatus,
    resetMap
  };
})();
