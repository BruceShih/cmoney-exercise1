import { Dom } from './dom';
import { displayMode } from './mode';
import { initializePaginator, currentPage } from './paginator';

export let selectedCity = '';
export let selectedTown = '';

export function initializeCitySelector(cityOptions) {
  let optionsHtml = '';
  const citySelector = new Dom().getById('city-selector');
  citySelector.setInnerHTML('');
  citySelector.addEventListener('change', citySelectorEventHandler);

  const defaultOption = new Dom('option');
  defaultOption.setAttribute('selected', 'selected');
  defaultOption.setAttribute('disabled', 'disabled');
  defaultOption.setInnerText('請選擇行政區域');
  defaultOption.setValue('');
  optionsHtml += defaultOption.toString();

  cityOptions.forEach((city) => {
    const option = new Dom('option');
    option.setInnerText(city);
    option.setValue(city);
    optionsHtml += option.toString();
  });

  citySelector.setInnerHTML(optionsHtml);
}

function citySelectorEventHandler(e) {
  currentPage = 1;
  selectedCity = e.target.value;
  selectedTown = '';
  initializeTownSelector(dataService.selectedCity);
  populateFoods(displayMode);
  initializePaginator();
}

export function initializeTownSelector(townOptions) {
  let optionsHtml = '';
  const townSelector = new Dom().getById('town-selector');
  townSelector.setInnerHTML('');
  townSelector.addEventListener('change', townSelectorEventHandler);

  const defaultOption = new Dom('option');
  defaultOption.setAttribute('selected', 'selected');
  defaultOption.setAttribute('disabled', 'disabled');
  defaultOption.setInnerText('請選擇鄉鎮區');
  defaultOption.setValue('');
  optionsHtml += defaultOption.toString();

  townOptions.forEach((town) => {
    const option = new Dom('option');
    option.setInnerText(town);
    option.setValue(town);
    optionsHtml += option.toString();
  });

  townSelector.setInnerHTML(optionsHtml);
}

function townSelectorEventHandler(e) {
  currentPage = 1;
  selectedTown = e.target.value;
  populateFoods(displayMode);
  initializePaginator();
}
