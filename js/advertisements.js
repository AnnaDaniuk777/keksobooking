import { mapModule } from './map/map.js';

const MAX_ADVERTISEMENTS = 10;
let advertisements = [];
let markers = [];

function createAdvertisementPopup(advertisement) {
  const template = document.querySelector('#card');
  const popupElement = template.content.querySelector('.popup').cloneNode(true);

  const fillElement = (selector, content, hideIfEmpty = true) => {
    const element = popupElement.querySelector(selector);
    if (element) {
      if (content) {
        element.textContent = content;
      } else if (hideIfEmpty) {
        element.style.display = 'none';
      }
    }
  };

  const avatar = popupElement.querySelector('.popup__avatar');
  if (avatar && advertisement.author && advertisement.author.avatar) {
    avatar.src = advertisement.author.avatar;
  } else if (avatar) {
    avatar.style.display = 'none';
  }

  fillElement('.popup__title', advertisement.offer ? advertisement.offer.title : '');
  fillElement('.popup__text--address', advertisement.offer ? advertisement.offer.address : '');

  if (advertisement.offer && advertisement.offer.price) {
    fillElement('.popup__text--price', `${advertisement.offer.price} ₽/ночь`);
  } else {
    fillElement('.popup__text--price', '');
  }

  const typeElement = popupElement.querySelector('.popup__type');
  if (typeElement && advertisement.offer && advertisement.offer.type) {
    const types = {
      flat: 'Квартира',
      bungalow: 'Бунгало',
      house: 'Дом',
      palace: 'Дворец',
      hotel: 'Отель'
    };
    typeElement.textContent = types[advertisement.offer.type] || advertisement.offer.type;
  } else if (typeElement) {
    typeElement.style.display = 'none';
  }

  if (advertisement.offer && advertisement.offer.rooms && advertisement.offer.guests) {
    fillElement('.popup__text--capacity',
      `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей`
    );
  } else {
    fillElement('.popup__text--capacity', '');
  }

  if (advertisement.offer && advertisement.offer.checkin && advertisement.offer.checkout) {
    fillElement('.popup__text--time',
      `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}`
    );
  } else {
    fillElement('.popup__text--time', '');
  }

  fillElement('.popup__description', advertisement.offer ? advertisement.offer.description : '');

  const featuresContainer = popupElement.querySelector('.popup__features');
  if (featuresContainer) {
    if (advertisement.offer && advertisement.offer.features && advertisement.offer.features.length > 0) {
      featuresContainer.innerHTML = '';
      advertisement.offer.features.forEach((feature) => {
        const featureElement = document.createElement('li');
        featureElement.className = `popup__feature popup__feature--${feature}`;
        featuresContainer.appendChild(featureElement);
      });
    } else {
      featuresContainer.style.display = 'none';
    }
  }

  const photosContainer = popupElement.querySelector('.popup__photos');
  if (photosContainer) {
    if (advertisement.offer && advertisement.offer.photos && advertisement.offer.photos.length > 0) {
      photosContainer.innerHTML = '';
      advertisement.offer.photos.forEach((photo) => {
        const img = document.createElement('img');
        img.src = photo;
        img.className = 'popup__photo';
        img.width = 45;
        img.height = 40;
        img.alt = 'Фотография жилья';
        photosContainer.appendChild(img);
      });
    } else {
      photosContainer.style.display = 'none';
    }
  }

  return popupElement;
}

function createAdvertisementBalloon(advertisement) {
  return createAdvertisementPopup(advertisement);
}

const createAdvertisementMarker = (advertisement) => {
  const balloonContent = createAdvertisementBalloon(advertisement);

  return new ymaps.Placemark(
    [advertisement.location.lat, advertisement.location.lng],
    {
      balloonContent: balloonContent.outerHTML,
      hintContent: advertisement.offer ? advertisement.offer.title : 'Объявление'
    },
    {
      preset: 'islands#blueIcon',
      balloonCloseButton: true,
      hideIconOnBalloonOpen: false
    }
  );
};

const renderAdvertisements = (ads) => {
  clearAdvertisements();

  const adsToShow = ads.slice(0, MAX_ADVERTISEMENTS);
  const map = mapModule.getMap();

  if (typeof ymaps === 'undefined') {
    throw new Error('Yandex Maps not loaded');
  }

  adsToShow.forEach((advertisement) => {
    try {
      const marker = createAdvertisementMarker(advertisement);
      map.geoObjects.add(marker);
      markers.push(marker);
    } catch (error) {
      throw new Error('Error creating marker');
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
    if (marker.balloon) {
      marker.balloon.close();
    }
  });
};

const setAdvertisements = (ads) => {
  advertisements = ads;
};

const getAdvertisements = () => advertisements;

export {
  renderAdvertisements,
  clearAdvertisements,
  setAdvertisements,
  getAdvertisements,
  closeAllPopups,
  MAX_ADVERTISEMENTS
};
