'use strict';

var totalPages = 1;
var currentPage = 1;

/**
 * @param {MouseEvent} event
 */
function onPageChange(event) {
  // set the current page
  currentPage = event.target.dataset.page;
  // TODO: reload the data
}

function fetchData() {
  var request = new XMLHttpRequest();
  request.open(
    'GET',
    'https://data.coa.gov.tw/Service/OpenData/ODwsv/ODwsvTravelFood.aspx'
  );
  request.onload = ajaxSuccess;
  request.send();
}

function ajaxSuccess() {
  console.log('api fetching success');
}

// register data fetching function to window namespace
window.food.fetch = fetchData;
