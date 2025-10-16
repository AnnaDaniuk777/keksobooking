import { initForm } from './form/index.js';
import { mapModule } from './map/map.js';
import { initResetHandler } from './form/reset-form.js';
import { loadData } from './map/api.js';
import { setAdvertisements, renderAdvertisements } from './map/advertisements.js';
import { initFilters, disableFilters, resetFilters } from './map/filters.js';

const initApp = async () => {
  try {
    await mapModule.initMap();
    disableFilters();

    const advertisements = await loadData();
    setAdvertisements(advertisements);
    renderAdvertisements(advertisements);

    initFilters();
    const coords = mapModule.getCurrentCoords();
    initForm(coords);
    initResetHandler();

    const adForm = document.querySelector('.ad-form');
    if (adForm) {
      adForm.addEventListener('reset', () => {
        setTimeout(() => {
          resetFilters();
        }, 0);
      });
    }

  } catch (error) {
    throw new Error(`Ошибка инициализации приложения: ${error.message}`);
  }
};

document.addEventListener('DOMContentLoaded', initApp);
