import { overlay } from './overlay.js';

export async function initializeData() {
  const session = window.sessionStorage.getItem('foods');
  if (!session) {
    overlay.show();
    const response = await fetch('https://data.coa.gov.tw/Service/OpenData/ODwsv/ODwsvTravelFood.aspx');
    if (response.status === 200) {
      const data = await response.json();
      window.sessionStorage.setItem('foods', JSON.stringify(data));
      overlay.hide();
    }
  }
}

export function getData(city, town, page) {
  const foods = JSON.parse(window.sessionStorage.getItem('foods'));
  if (foods) {
    let filteredData = foods;
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

    window.sessionStorage.setItem('totalPages', Math.ceil(filteredData.length / 10));
    if (page) {
      filteredData = filteredData.slice((page - 1) * 10, page * 10);
      window.sessionStorage.setItem('currentPage', page);
    }

    return filteredData;
  }

  return [];
}

export function getCities() {
  return [
    ...new Set(
      getData().map((item) => {
        return item.City;
      })
    )
  ];
}

export function getTowns(city) {
  return [
    ...new Set(
      getData(city).map((item) => {
        return item.Town;
      })
    )
  ];
}
