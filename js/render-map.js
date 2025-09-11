import { initBookingInfo } from './generate-array.js';
import { renderCard } from './card-render.js';

export function renderCardToMap() {
  const bookingInfo = initBookingInfo();
  const cardTemplate = renderCard(bookingInfo);

  const mapContainer = document.querySelector('.map__canvas');

  mapContainer.innerHTML = '';

  mapContainer.appendChild(cardTemplate.content.cloneNode(true));
}
