import { initForm } from './form/index.js';
import { mapModule } from './map/map.js';
import { initResetHandler } from './form/reset-form.js';

const initApp = () => {
  mapModule.initMap();

  setTimeout(() => {
    const coords = mapModule.getCurrentCoords();
    initForm(coords);
    initResetHandler();
  }, 100);
};

document.addEventListener('DOMContentLoaded', initApp);
