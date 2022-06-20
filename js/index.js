import { fetchData } from './modules/data';
import { initializeModeSwitcher } from './modules/mode';
import { initializePaginator } from './modules/paginator';

let data = fetchData();
let selectedCity = '';
let selectedTown = '';
let displayMode = 'list';

function initializeApp() {
  totalPages = Math.ceil(data.length / pageSize);

  populateCitySelector();
  populateTownSelector();
  initializeModeSwitcher();
  populateFoods(displayMode);
  initializePaginator(totalPages);

  if (window.screen.width > 768) {
    var ads = document.getElementById('ads');
    for (var i = 1; i <= 3; i++) {
      var ad = document.createElement('img');
      ad.src = './images/adv' + i + '.png';
      ad.alt = 'ad' + i;
      ads.appendChild(ad);
    }
  }
}

function getCities() {
  return [
    ...new Set(
      this.getData().map((item) => {
        return item.City;
      })
    )
  ];
}

function getTowns(city) {
  return [
    ...new Set(
      this.getData(city).map((item) => {
        return item.Town;
      })
    )
  ];
}

(function () {
  // initialize

  function populateFoods(mode) {}

  

  function _unique(arr) {
    var seen = {};
    var output = [];
    var j = 0;

    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      if (seen[item] !== 1) {
        seen[item] = 1;
        output[j++] = item;
      }
    }
    return output;
  }

  init();
})();
