import { initValidation } from './validation.js';
import { createSlider } from './slider.js';
import { initImageHandlers } from './images.js';
import { showMessage } from './messages.js';

const form = document.querySelector('.ad-form');
const priceInput = form.querySelector('#price');
const typeSelect = form.querySelector('#type');
const timeinSelect = form.querySelector('#timein');
const timeoutSelect = form.querySelector('#timeout');
const addressInput = form.querySelector('#address');
const submitButton = form.querySelector('.ad-form__submit');
const resetButton = form.querySelector('.ad-form__reset');
const avatarPreview = form.querySelector('.ad-form-header__preview img');
const imagesContainer = form.querySelector('.ad-form__photo');

let pristine;
let priceSlider;

const lockAddressInput = () => {
  addressInput.readOnly = true;
  addressInput.style.backgroundColor = '#f2f2f2';
  addressInput.style.cursor = 'not-allowed';
};

const syncTime = (source, target) => {
  target.value = source.value;
};

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? 'Публикация...' : 'Опубликовать';
};

const resetForm = () => {
  form.reset();
  avatarPreview.src = 'img/muffin-grey.svg';
  imagesContainer.innerHTML = '';

  pristine.reset();
};

const sendForm = async (formData) => {
  try {
    toggleSubmitButton(true);

    const response = await fetch('https://25.javascript.htmlacademy.pro/keksobooking', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    }

    showMessage('success');
    resetForm();
  } catch (error) {
    showMessage('error');
  } finally {
    toggleSubmitButton(false);
  }
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (!isValid) {
    const firstError = form.querySelector('.ad-form__element--invalid');

    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return;
  }

  const formData = new FormData(form);

  await sendForm(formData);
};

const onFormReset = (evt) => {
  evt.preventDefault();
  resetForm();
};

export const initForm = (defaultCoords) => {
  lockAddressInput();

  setAddress(defaultCoords.lat, defaultCoords.lng);

  pristine = initValidation(form);
  priceSlider = createSlider(priceInput, typeSelect.value);
  initImageHandlers();

  timeinSelect.addEventListener('change', () => syncTime(timeinSelect, timeoutSelect));

  timeoutSelect.addEventListener('change', () => syncTime(timeoutSelect, timeinSelect));

  form.addEventListener('submit', onFormSubmit);

  resetButton.addEventListener('click', onFormReset);
};

export function setAddress(lat, lng) {
  addressInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}

export const updatePriceConstraints = () => {
  if (priceSlider) {
    priceSlider.update();
  }
};
