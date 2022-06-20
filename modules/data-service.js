import { overlay } from './overlay';

export class DataService {
  _data = [];
  _totalPages = 1;
  _currentPage = 1;
  _pageSize = 10;
  _selectedCity = '';
  _selectedTown = '';
  _displayMode = 'list';

  constructor() {}

  getData(city, town, page) {
    if (!this._data || this._data.length === 0) {
      this._data = this.fetchData();
    }

    let filteredData = this._data;
    if (city) {
      filteredData = filteredData.filter(function (item) {
        return item.City === city;
      });
    }
    if (town) {
      filteredData = filteredData.filter(function (item) {
        return item.Town === town;
      });
    }

    this._totalPages = Math.ceil(filteredData.length / this._pageSize);
    if (page) {
      filteredData = filteredData.slice(
        (page - 1) * this._pageSize,
        page * this._pageSize
      );
      this._currentPage = page;
    }

    return filteredData;
  }

  getCities() {
    return [
      ...new Set(
        this.getData().map((item) => {
          return item.City;
        })
      )
    ];
  }

  getTowns(city) {
    return [
      ...new Set(
        this.getData(city).map((item) => {
          return item.Town;
        })
      )
    ];
  }

  fetchData() {
    overlay.show();
    fetch('https://data.coa.gov.tw/Service/OpenData/ODwsv/ODwsvTravelFood.aspx')
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        overlay.hide();
      });
  }

  get currentPage() {
    return this._currentPage;
  }

  set currentPage(page) {
    this._currentPage = page;
  }

  get totalPages() {
    return this._totalPages;
  }

  set totalPages(totalPages) {
    this._totalPages = totalPages;
  }

  get pageSize() {
    return this._pageSize;
  }

  set pageSize(pageSize) {
    this._pageSize = pageSize;
  }

  set selectedCity(city) {
    this._selectedCity = city;
  }

  get selectedCity() {
    return this._selectedCity;
  } 

  set selectedTown(town) {
    this._selectedTown = town;
  }

  get selectedTown() {
    return this._selectedTown;
  }

  set displayMode(mode) {
    if (['list', 'table', 'grid'].indexOf(mode) === -1) {
      throw new Error('Invalid display mode');
    }

    this._displayMode = mode;
  }

  get displayMode() {
    return this._displayMode;
  }
}
