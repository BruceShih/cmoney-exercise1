import { initializeAds } from './modules/ads.js';
import { initializeData } from './modules/data.js';
import { initializeFoods } from './modules/food.js';
import { initializeModeSwitcher } from './modules/mode.js';
import {
  initializeCitySelector,
  initializeTownSelector
} from './modules/location.js';
import { initializePaginator } from './modules/paginator.js';

async function initializeApp() {
  await initializeData();

  initializeCitySelector();
  initializeTownSelector();
  initializeModeSwitcher();
  initializeFoods();
  initializePaginator();
  initializeAds();
}

await initializeApp();
