import { getGuestWord, getRoomWord } from './pluralize-words.js';

export function renderCard(bookingInfo) {
  const { author, offer } = bookingInfo;

  const template = document.createElement('template');
  template.id = 'card';

  template.innerHTML = `
  <article class="popup">
    <img src="${author.avatar}" class="popup__avatar" width="70" height="70" alt="Аватар пользователя">
      <h3 class="popup__title">${offer.title}</h3>
      <p class="popup__text popup__text--address">${offer.address}</p>
      <p class="popup__text popup__text--price">${offer.price} <span>₽/ночь</span></p>
      <h4 class="popup__type">${getTypeTitle(offer.type)}</h4>
      <p class="popup__text popup__text--capacity">${offer.rooms} ${getRoomWord(offer.rooms)} для ${offer.guests} ${getGuestWord(offer.guests)}</p>
      <p class="popup__text popup__text--time">Заезд после ${offer.checkin}, выезд до ${offer.checkout}</p>
      <ul class="popup__features">
        ${generateFeatures(offer.features)}
      </ul>
      <p class="popup__description">${offer.description}</p>
      <div class="popup__photos">
        ${generatePhotos(offer.photos)}
      </div>
  </article>
  `;

  return template;
}

function generateFeatures(features) {
  if (!features || features.length === 0) {
    return '';
  }

  return features.map((feature) =>
    `<li class="popup__feature popup__feature--${feature}"></li>`
  ).join('');
}

function generatePhotos(photos) {
  if (!photos || photos.length === 0) {
    return '';
  }

  return photos.map((photo) =>
    `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`
  ).join('');
}

function getTypeTitle(type) {
  switch (type) {
    case 'flat':
      return 'Кварира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'hotel':
      return 'Отель';
    default:
      return 'Тип не указан';
  }
}
