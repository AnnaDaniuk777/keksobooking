import { initBookingInfo } from './generate-array.js';
import { renderCard } from './card-render.js';

function hideEmptyElement(element, value) {
  if (!value || value.toString().trim() === '' || value === 0) {
    element.style.display = 'none';
  } else {
    element.style.display = '';
  }
}

function initCardElements(cardElement, offer) {
  const photosElement = cardElement.querySelector('.popup__photos');
  const descriptionElement = cardElement.querySelector('.popup__description');
  const featuresElement = cardElement.querySelector('.popup__features');
  const timeElement = cardElement.querySelector('.popup__text--time');
  const textCapacityElement = cardElement.querySelector('.popup__text--capacity');
  const typeElement = cardElement.querySelector('.popup__type');
  const priceElement = cardElement.querySelector('.popup__text--price');
  const addressElement = cardElement.querySelector('.popup__text--address');
  const titleElement = cardElement.querySelector('.popup__title');

  hideEmptyElement(photosElement, offer.photos.length);
  hideEmptyElement(descriptionElement, offer.description);
  hideEmptyElement(featuresElement, offer.features.length);
  hideEmptyElement(timeElement, offer.checkin && offer.checkout);
  hideEmptyElement(textCapacityElement, offer.rooms && offer.guests);
  hideEmptyElement(typeElement, offer.type);
  hideEmptyElement(priceElement, offer.price);
  hideEmptyElement(addressElement, offer.address);
  hideEmptyElement(titleElement, offer.title);
}

export function renderMultipleCardsToMap(count) {
  const mapContainer = document.querySelector('.map__canvas');

  mapContainer.innerHTML = '';

  for (let i = 0; i < count; i++) {
    const bookingInfo = initBookingInfo();
    const cardTemplate = renderCard(bookingInfo);
    const cardClone = cardTemplate.content.cloneNode(true);

    initCardElements(cardClone, bookingInfo.offer);
    mapContainer.append(cardClone);
  }
}
