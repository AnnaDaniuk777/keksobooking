import { renderAdvertisements, getAdvertisements, closeAllPopups } from './advertisements.js';

const PRICE_RANGES = {
  low: { min: 0, max: 10000 },
  middle: { min: 10000, max: 50000 },
  high: { min: 50000, max: Infinity }
};

let filterTimeout;

const filterByType = (advertisement, type) => {
  if (type === 'any') { return true; }
  return advertisement.offer && advertisement.offer.type === type;
};

const filterByPrice = (advertisement, price) => {
  if (price === 'any') { return true; }
  if (!advertisement.offer || !advertisement.offer.price) { return false; }

  const range = PRICE_RANGES[price];
  return advertisement.offer.price >= range.min && advertisement.offer.price <= range.max;
};

const filterByRooms = (advertisement, rooms) => {
  if (rooms === 'any') { return true; }
  return advertisement.offer && advertisement.offer.rooms === parseInt(rooms, 10);
};

const filterByGuests = (advertisement, guests) => {
  if (guests === 'any') { return true; }
  return advertisement.offer && advertisement.offer.guests === parseInt(guests, 10);
};

const filterByFeatures = (advertisement, selectedFeatures) => {
  if (selectedFeatures.length === 0) { return true; }

  if (!advertisement.offer || !advertisement.offer.features || advertisement.offer.features.length === 0) {
    return false;
  }

  return selectedFeatures.every((feature) =>
    advertisement.offer.features.includes(feature)
  );
};

const getSelectedFilters = () => {
  const housingType = document.getElementById('housing-type').value;
  const housingPrice = document.getElementById('housing-price').value;
  const housingRooms = document.getElementById('housing-rooms').value;
  const housingGuests = document.getElementById('housing-guests').value;

  const featureCheckboxes = document.querySelectorAll('#housing-features input:checked');
  const selectedFeatures = Array.from(featureCheckboxes).map((cb) => cb.value);

  return { housingType, housingPrice, housingRooms, housingGuests, selectedFeatures };
};

const applyFilters = () => {
  const filters = getSelectedFilters();
  const allAdvertisements = getAdvertisements();

  const filteredAdvertisements = allAdvertisements.filter((advertisement) => advertisement.offer &&
    filterByType(advertisement, filters.housingType) &&
    filterByPrice(advertisement, filters.housingPrice) &&
    filterByRooms(advertisement, filters.housingRooms) &&
    filterByGuests(advertisement, filters.housingGuests) &&
    filterByFeatures(advertisement, filters.selectedFeatures));

  closeAllPopups();
  renderAdvertisements(filteredAdvertisements);
};

const debouncedFilter = () => {
  clearTimeout(filterTimeout);
  filterTimeout = setTimeout(applyFilters, 500);
};

const initFilters = () => {
  const filterForm = document.querySelector('.map__filters');
  const filterElements = filterForm.querySelectorAll('select, input');

  filterElements.forEach((element) => {
    element.disabled = false;
  });

  filterForm.addEventListener('change', debouncedFilter);
  filterForm.addEventListener('input', debouncedFilter);
};

const disableFilters = () => {
  const filterForm = document.querySelector('.map__filters');
  const filterElements = filterForm.querySelectorAll('select, input');

  filterElements.forEach((element) => {
    element.disabled = true;
  });
};

const resetFilters = () => {
  const filterForm = document.querySelector('.map__filters');
  filterForm.reset();
  applyFilters();
};

export { initFilters, disableFilters, resetFilters, applyFilters };
