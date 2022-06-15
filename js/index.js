'use strict';

(function () {
  var totalPages = 1;
  var currentPage = 1;
  var pageSize = 10;
  var data = [];
  var isLoading;
  var request = new XMLHttpRequest();

  function getData(city, town, page = 1) {
    if (!data || data.length === 0) {
      fetchData();
    }
    var filteredData = data;
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

    totalPages = Math.ceil(filteredData.length / pageSize);

    if (page) {
      filteredData = filteredData.slice((page - 1) * pageSize, page * pageSize);
      currentPage = page;
    }

    return filteredData;
  }

  function fetchData() {
    if (!data || data.length === 0) {
      request.open(
        'GET',
        'https://data.coa.gov.tw/Service/OpenData/ODwsv/ODwsvTravelFood.aspx'
      );
      request.onload = function () {
        isLoading = false;
        if (request.status === 200) {
          data = JSON.parse(request.response);
          totalPages = Math.ceil(data.length / pageSize);
          populatePaginator();
        }
      };
      request.onerror = function () {
        isLoading = false;
      };
      request.onprogress = function () {
        isLoading = true;
      };
      // request.onreadystatechange = function () {
      //   if (request.status === 200) {
      //     data = JSON.parse(request.response);
      //     totalPages = Math.ceil(data.length / pageSize);
      //     populatePaginator();
      //   }
      // };
      request.send();
    }
  }

  // populate paginator
  function populatePaginator() {
    var paginator = document.getElementById('paginator');
    var text = document.createElement('div');
    text.className = 'pagination__current-page';
    text.innerText = '美食頁次 ' + currentPage + '/' + totalPages;
    var buttonGroup = document.createElement('div');
    buttonGroup.className = 'pagination__button-group';

    for (var i = 1; i <= totalPages; i++) {
      var button = document.createElement('button');
      button.className = 'button';
      if (i === 1) button.className += ' button-active';
      button.dataset.page = i;
      button.innerText = i.toString();
      button.setAttribute('type', 'button');
      button.addEventListener('onclick', paginatorEventHandler);
      buttonGroup.appendChild(button);
    }

    paginator.appendChild(text);
    paginator.appendChild(buttonGroup);
  }

  function paginatorEventHandler(e) {
    console.log(e);
  }

  fetchData();
})();
