import { overlay } from './overlay';

let data = [];

function fetchData() {
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

export function getData(city, town, page) {
  if (!data || data.length === 0) {
    data = fetchData();
  }

  let filteredData = data;
  if (city) {
    filteredData = filteredData.filter((item) => {
      return item.City === city;
    });
  }
  if (town) {
    filteredData = filteredData.filter((item) => {
      return item.Town === town;
    });
  }

  _totalPages = Math.ceil(filteredData.length / _pageSize);
  if (page) {
    filteredData = filteredData.slice(
      (page - 1) * _pageSize,
      page * _pageSize
    );
    _currentPage = page;
  }

  return filteredData;
}
