import { mapModule } from '../map/map.js';

export const initResetHandler = () => {
  const resetButton = document.querySelector('.ad-form__reset');

  if (resetButton) {
    resetButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      mapModule.resetMap();
    });
  }
};
