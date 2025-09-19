export function togglePageState(isActive) {
  const adForm = document.querySelector('.ad-form');
  const mapFilters = document.querySelector('.map__filters');
  const allFieldsets = document.querySelectorAll('fieldset');
  const filterElements = document.querySelectorAll('.map__filters select, .map__filters input');
  const slider = document.querySelector('.ad-form__slider');

  adForm.classList.toggle('ad-form--disabled', !isActive);
  mapFilters.classList.toggle('map__filters--disabled', !isActive);

  allFieldsets.forEach((fieldset) => {
    fieldset.disabled = !isActive;
  });

  filterElements.forEach((element) => {
    element.disabled = !isActive;
  });

  if (slider) {
    slider.style.disabled = !isActive;
  }
}
