import { DataService } from './data-service';
import { Dom } from './dom';

const dataService = new DataService();

function populateCitySelector() {
  let optionsHtml = '';
  const citySelector = new Dom().getById('city-selector');
  citySelector.setInnerHTML('');
  citySelector.addEventListener('change', citySelectorEventHandler);

  const cityOptions = dataService.getCities();

  const defaultOption = new Dom('option');
  defaultOption.setAttribute('selected', 'selected');
  defaultOption.setAttribute('disabled', 'disabled');
  defaultOption.setInnerText('請選擇行政區域');
  defaultOption.setValue('');
  optionsHtml += defaultOption.toString();

  for (var i = 0; i < cityOptions.length; i++) {
    const option = new Dom('option');
    option.setInnerText(cityOptions[i]);
    option.setValue(cityOptions[i]);
    optionsHtml += option.toString();
  }
  citySelector.setInnerHTML(optionsHtml);
}

function citySelectorEventHandler(e) {
  dataService.currentPage = 1;
  dataService.selectedCity = e.target.value;
  dataService.selectedTown = '';
  populateTownSelector(dataService.selectedCity);
  populateFoods(dataService.displayMode);
  populatePaginator();
}

function populateTownSelector(city) {
  var townSelector = document.getElementById('town-selector');
  townSelector.innerHTML = '';
  townSelector.addEventListener('change', townSelectorEventHandler);
  var townOptions = dataService.getTowns(city);

  var defaultOption = document.createElement('option');
  defaultOption.setAttribute('selected', 'selected');
  defaultOption.setAttribute('disabled', 'disabled');
  defaultOption.innerText = '請選擇鄉鎮區';
  defaultOption.value = '';
  townSelector.appendChild(defaultOption);

  for (var i = 0; i < townOptions.length; i++) {
    var option = document.createElement('option');
    option.innerText = townOptions[i];
    option.value = townOptions[i];
    townSelector.appendChild(option);
  }
}

function townSelectorEventHandler(e) {
  currentPage = 1;
  selectedTown = e.target.value;
  populateFoods(displayMode);
  populatePaginator();
}
