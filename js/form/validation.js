const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 100000;

export const housingTypeMinPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

export const housingTypePlaceholder = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};

export const roomNumberCapacity = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const typeSelect = document.querySelector('#type');
const roomNumberSelect = document.querySelector('#room_number');
const capacitySelect = document.querySelector('#capacity');
const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');

const validateTitle = (value) => value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;

const getTitleErrorMessage = () => `Заголовок должен быть от ${MIN_TITLE_LENGTH} до ${MAX_TITLE_LENGTH} символов`;

const validatePrice = (value) => {
  const price = Number(value);
  const currentMinPrice = housingTypeMinPrice[typeSelect.value];

  return price >= currentMinPrice && price <= MAX_PRICE;
};

function getPriceErrorMessage() {
  const currentMinPrice = housingTypeMinPrice[typeSelect.value];

  return `Цена должна быть от ${currentMinPrice} до ${MAX_PRICE}`;
}

const validateCapacity = () => {
  const rooms = roomNumberSelect.value;
  const capacity = capacitySelect.value;

  return roomNumberCapacity[rooms].includes(capacity);
};

const getCapacityErrorMessage = () => {
  const rooms = roomNumberSelect.value;
  const allowedCapacities = roomNumberCapacity[rooms];
  const guestText = allowedCapacities.length === 1 ? 'гость' : 'гостя';

  return `Для ${rooms} ${rooms === '1' ? 'комнаты' : 'комнат'} доступно: ${allowedCapacities.join(', ')} ${guestText}`;
};

export const initValidation = (form) => {
  const pristine = new Pristine(form, {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    successClass: 'ad-form__element--valid',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'span',
    errorTextClass: 'ad-form__error',
  });

  pristine.addValidator(titleInput, validateTitle, getTitleErrorMessage, 2, true);
  pristine.addValidator(priceInput, validatePrice, getPriceErrorMessage, 2, true);
  pristine.addValidator(capacitySelect, validateCapacity, getCapacityErrorMessage, 2, true);

  setTimeout(() => {
    pristine.validate(capacitySelect);
  }, 0);

  roomNumberSelect.addEventListener('change', () => {
    pristine.validate(capacitySelect);
  });

  capacitySelect.addEventListener('change', () => {
    pristine.validate(capacitySelect);
  });

  typeSelect.addEventListener('change', () => {
    const currentPlaceholder = housingTypePlaceholder[typeSelect.value];
    const currentMinPrice = housingTypeMinPrice[typeSelect.value];

    priceInput.placeholder = currentPlaceholder;
    priceInput.min = currentMinPrice;
    pristine.validate(priceInput);
  });

  return pristine;
};
