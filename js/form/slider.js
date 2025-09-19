import { housingTypeMinPrice } from './validation.js';

const MAX_PRICE = 100000;

export const createSlider = (priceInput, housingType) => {
  const sliderElement = document.querySelector('.ad-form__slider');

  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }

  const minPrice = housingTypeMinPrice[housingType];

  noUiSlider.create(sliderElement, {
    range: {
      min: minPrice,
      max: MAX_PRICE,
    },
    start: minPrice,
    step: 1,
    connect: 'lower',
    format: {
      to: (value) => Math.round(value),
      from: (value) => Number(value),
    },
  });

  sliderElement.noUiSlider.on('update', (values) => {
    priceInput.value = values[0];
  });

  priceInput.addEventListener('input', () => {
    const currentMinPrice = housingTypeMinPrice[document.querySelector('#type').value];
    const value = Math.max(currentMinPrice, Math.min(MAX_PRICE, Number(priceInput.value) || currentMinPrice));

    sliderElement.noUiSlider.set(value);
  });

  return {
    element: sliderElement,
    update: () => {
      const newMinPrice = housingTypeMinPrice[document.querySelector('#type').value];

      sliderElement.noUiSlider.updateOptions({
        range: {
          min: newMinPrice,
          max: MAX_PRICE
        }
      });
    }
  };
};
