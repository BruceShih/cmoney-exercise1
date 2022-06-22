import { Dom } from './dom.js';
import { getCities, getTowns } from './data.js';
import { initializeFoods } from './food.js';
import { initializePaginator, resetCurrentPage } from './paginator.js';

export let selectedCity = '';
export let selectedTown = '';

export function initializeCitySelector() {
  let optionsHtml = '';
  const citySelector = new Dom().getById('CitySelector');
  citySelector.setInnerHtml('');
  citySelector.addEventListener('change', citySelectorEventHandler);

  const defaultOption = new Dom('option');
  defaultOption.setAttribute('selected', 'selected');
  defaultOption.setAttribute('disabled', 'disabled');
  defaultOption.setInnerText('請選擇行政區域');
  defaultOption.setValue('');
  optionsHtml += defaultOption.toString();

  const cityOptions = getCities();

  if (cityOptions instanceof Array && cityOptions.length > 0)
    cityOptions.forEach((city) => {
      const option = new Dom('option');
      option.setInnerText(city);
      option.setValue(city);
      optionsHtml += option.toString();
    });

  citySelector.setInnerHtml(optionsHtml);
}

function citySelectorEventHandler(e) {
  resetCurrentPage();
  selectedCity = e.target.value;
  selectedTown = '';
  initializeTownSelector(selectedCity);
  initializeFoods();
  initializePaginator();
}

export function initializeTownSelector() {
  let optionsHtml = '';
  const townSelector = new Dom().getById('TownSelector');
  townSelector.setInnerHtml('');
  townSelector.addEventListener('change', townSelectorEventHandler);

  const defaultOption = new Dom('option');
  defaultOption.setAttribute('selected', 'selected');
  defaultOption.setAttribute('disabled', 'disabled');
  defaultOption.setInnerText('請選擇鄉鎮區');
  defaultOption.setValue('');
  optionsHtml += defaultOption.toString();

  const townOptions = getTowns(selectedCity);

  if (townOptions instanceof Array && townOptions.length > 0)
    townOptions.forEach((town) => {
      const option = new Dom('option');
      option.setInnerText(town);
      option.setValue(town);
      optionsHtml += option.toString();
    });

  townSelector.setInnerHtml(optionsHtml);
}

function townSelectorEventHandler(e) {
  resetCurrentPage();
  selectedTown = e.target.value;
  initializeFoods();
  initializePaginator();
}
