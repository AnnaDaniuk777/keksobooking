import { mapModule } from './map.js';

const MAX_ADVERTISEMENTS = 10;
let advertisements = [];
let markers = [];

const getAdvertisementType = (type) => {
  const types = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель'
  };

  return types[type] || type;
};

const createAdvertisementBalloon = (advertisement) => {
  if (!advertisement.offer) {
    return '<div class="popup">Нет данных об объявлении</div>';
  }

  let balloonContent = `
    <div class="popup">
      <img src="${advertisement.author.avatar || 'img/muffin-grey.svg'}" class="popup__avatar" width="70" height="70" alt="Аватар пользователя">
      <h3 class="popup__title">${advertisement.offer.title || 'Без названия'}</h3>
  `;

  if (advertisement.offer.address) {
    balloonContent += `<p class="popup__text popup__text--address">${advertisement.offer.address}</p>`;
  }

  if (advertisement.offer.price) {
    balloonContent += `<p class="popup__text popup__text--price">${advertisement.offer.price} <span>₽/ночь</span></p>`;
  }

  if (advertisement.offer.type) {
    balloonContent += `<h4 class="popup__type">${getAdvertisementType(advertisement.offer.type)}</h4>`;
  }

  if (advertisement.offer.rooms && advertisement.offer.guests) {
    balloonContent += `<p class="popup__text popup__text--capacity">${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей</p>`;
  }

  if (advertisement.offer.checkin && advertisement.offer.checkout) {
    balloonContent += `<p class="popup__text popup__text--time">Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}</p>`;
  }

  if (advertisement.offer.features && advertisement.offer.features.length > 0) {
    balloonContent += '<ul class="popup__features">';
    advertisement.offer.features.forEach((feature) => {
      balloonContent += `<li class="popup__feature popup__feature--${feature}"></li>`;
    });
    balloonContent += '</ul>';
  }

  if (advertisement.offer.description) {
    balloonContent += `<p class="popup__description">${advertisement.offer.description}</p>`;
  }

  if (advertisement.offer.photos && advertisement.offer.photos.length > 0) {
    balloonContent += '<div class="popup__photos">';
    advertisement.offer.photos.forEach((photo) => {
      balloonContent += `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
    });
    balloonContent += '</div>';
  }

  balloonContent += '</div>';
  return balloonContent;
};

const createAdvertisementMarker = (advertisement) => {
  const iconOptions = mapModule.getAdvertisementIcon();

  const marker = new ymaps.Placemark(
    [advertisement.location.lat, advertisement.location.lng],
    {
      balloonContentHeader: advertisement.offer.title || 'Объявление',
      balloonContentBody: createAdvertisementBalloon(advertisement),
      balloonContentFooter: 'Кексобукинг'
    },
    {
      ...iconOptions,
      hideIconOnBalloonOpen: false,
      balloonCloseButton: true
    }
  );

  marker.events.add('balloonopen', () => {
    markers.forEach((otherMarker) => {
      if (otherMarker !== marker) {
        otherMarker.balloon.close();
      }
    });
  });

  return marker;
};

const renderAdvertisements = (ads) => {
  clearAdvertisements();

  const adsToShow = ads.slice(0, MAX_ADVERTISEMENTS);

  adsToShow.forEach((advertisement) => {
    if (advertisement.location && advertisement.location.lat && advertisement.location.lng) {
      const marker = createAdvertisementMarker(advertisement);
      const map = mapModule.getMap();

      if (map) {
        map.geoObjects.add(marker);
        markers.push(marker);
      }
    }
  });
};

function clearAdvertisements() {
  const map = mapModule.getMap();
  if (map) {
    markers.forEach((marker) => {
      map.geoObjects.remove(marker);
    });
  }
  markers = [];
}

const closeAllPopups = () => {
  markers.forEach((marker) => {
    if (marker.balloon && marker.balloon.isOpen()) {
      marker.balloon.close();
    }
  });
};

const setAdvertisements = (ads) => {
  advertisements = Array.isArray(ads) ? ads : [];
};

const getAdvertisements = () => advertisements;

const filterAdvertisements = (filterFunction) => {
  const filteredAdvertisements = advertisements.filter(filterFunction);
  renderAdvertisements(filteredAdvertisements);
};

const getAdvertisementMarkers = () => markers;

export {
  renderAdvertisements,
  clearAdvertisements,
  setAdvertisements,
  getAdvertisements,
  closeAllPopups,
  filterAdvertisements,
  getAdvertisementMarkers,
  MAX_ADVERTISEMENTS
};
