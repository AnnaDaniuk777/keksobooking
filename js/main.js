import { renderMultipleCardsToMap } from './map-render.js';
import { togglePageState } from './form-state.js';
import { COUNT } from './data.js';
import { initForm } from './form/index.js';

const DEFAULT__COORDS = {
  lat: 35.6895,
  lng: 139.6917,
};

initForm(DEFAULT__COORDS);
renderMultipleCardsToMap(COUNT);
togglePageState(true);
