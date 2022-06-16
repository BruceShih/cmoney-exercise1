'use strict';

(function () {
  var totalPages = 1;
  var currentPage = 1;
  var pageSize = 10;
  var selectedCity = '';
  var selectedTown = '';
  var data = [];
  var isLoading = true;
  var displayMode = 'list';
  var request = new XMLHttpRequest();

  function getData(city, town, page) {
    if (!data || data.length === 0) {
      init();
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

  function init() {
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

          populateCitySelector();
          populateTownSelector();
          populateFoods(displayMode);
          populatePaginator();

          registerModeSwitcherEvents();
        }
      };
      request.onerror = function () {
        isLoading = false;
      };
      request.onprogress = function () {
        isLoading = true;
      };
      request.send();
    }
  }

  function populateCitySelector() {
    var citySelector = document.getElementById('city-selector');
    citySelector.innerHTML = '';
    citySelector.addEventListener('change', citySelectorEventHandler);
    var cityOptions = _unique(
      getData().map(function (item) {
        return item.City;
      })
    );

    var defaultOption = document.createElement('option');
    defaultOption.setAttribute('selected', 'selected');
    defaultOption.setAttribute('disabled', 'disabled');
    defaultOption.innerText = '請選擇行政區域';
    defaultOption.value = '';
    citySelector.appendChild(defaultOption);

    for (var i = 0; i < cityOptions.length; i++) {
      var option = document.createElement('option');
      option.innerText = cityOptions[i];
      option.value = cityOptions[i];
      citySelector.appendChild(option);
    }
  }

  function citySelectorEventHandler(e) {
    currentPage = 1;
    selectedCity = e.target.value;
    selectedTown = '';
    populateTownSelector(selectedCity);
    populateFoods(displayMode);
    populatePaginator();
  }

  function populateTownSelector(city) {
    var townSelector = document.getElementById('town-selector');
    townSelector.innerHTML = '';
    townSelector.addEventListener('change', townSelectorEventHandler);
    var townOptions = _unique(
      getData(city).map(function (item) {
        return item.Town;
      })
    );

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

  function registerModeSwitcherEvents() {
    var modeSwitchers = document.querySelectorAll(
      '#mode-switcher > .button-icon'
    );
    if (modeSwitchers) {
      for (var i = 0; i < modeSwitchers.length; i++) {
        if (i === 0) modeSwitchers[i].className += ' button-active';
        modeSwitchers[i].addEventListener(
          'click',
          modeSwitcherEventHandler,
          false
        );
      }
    }
  }

  function modeSwitcherEventHandler(e) {
    var modeSwitchers = document.querySelectorAll(
      '#mode-switcher > .button-icon'
    );
    if (modeSwitchers) {
      for (var i = 0; i < modeSwitchers.length; i++) {
        modeSwitchers[i].className = 'button button-icon';
      }
    }

    if (e.target.className.indexOf('button-active') <= 0) {
      e.target.className += ' button-active';
      displayMode = e.target.dataset.mode;

      // populateCitySelector();
      // populateTownSelector();
      populateFoods(displayMode);
      populatePaginator();
    }
  }

  function populateFoods(mode) {
    var data = getData(selectedCity, selectedTown, currentPage);
    var foods = document.getElementById('foods');
    // foods.innerHTML = '';

    if (mode === 'table') {
      var foodTable = document.createElement('table');
        foodTable.className =
          'table table-striped table-hover table-bordered table-responsive food-table';

        var foodTableHead = document.createElement('thead');
        var foodTableHeadRow = document.createElement('tr');
        var headers = ['編號', '行政區域', '鄉鎮區', '商家', '地址'];
        for (var i = 0; i < headers.length; i++) {
          var foodTableHeadRowCell = document.createElement('th');
          foodTableHeadRowCell.innerText = headers[i];
          foodTableHeadRow.appendChild(foodTableHeadRowCell);
        }
        foodTableHead.appendChild(foodTableHeadRow);
        foodTable.appendChild(foodTableHead);

        var foodTableBody = document.createElement('tbody');
        for (var i = 0; i < data.length; i++) {
          var food = data[i];
          var foodTableBodyRow = document.createElement('tr');
          var foodTableBodyId = document.createElement('td');
          foodTableBodyId.innerText = ((i + 1) + (currentPage - 1) * pageSize).toString();
          foodTableBodyRow.appendChild(foodTableBodyId);
          var foodTableBodyCity = document.createElement('td');
          foodTableBodyCity.innerText = food.City;
          foodTableBodyRow.appendChild(foodTableBodyCity);
          var foodTableBodyTown = document.createElement('td');
          foodTableBodyTown.innerText = food.Town;
          foodTableBodyRow.appendChild(foodTableBodyTown);
          var foodTableBodyName = document.createElement('td');
          foodTableBodyName.innerText = food.Name;
          foodTableBodyRow.appendChild(foodTableBodyName);
          var foodTableBodyAddress = document.createElement('td');
          foodTableBodyAddress.innerText = food.Address;
          foodTableBodyRow.appendChild(foodTableBodyAddress);
          foodTableBody.appendChild(foodTableBodyRow);
        }
        foodTable.appendChild(foodTableBody);
        // foods.appendChild(foodTable);
    } else {
      for (var i = 0; i < data.length; i++) {
        var food = data[i];
        var foodItem = document.createElement('div');
        foodItem.className = mode === 'grid' ? 'food food-grid' : 'food food-list';

        var foodImage = document.createElement('div');
        foodImage.className = 'food-img';
        var img = document.createElement('img');
        img.src = food.PicURL;
        img.alt = food.Name;
        img.loading = 'lazy';
        foodImage.appendChild(img);

        var foodContent = document.createElement('div');
        foodContent.className = 'food-content';
        var foodTitle = document.createElement('h2');
        foodTitle.innerText = food.Name;
        foodContent.appendChild(foodTitle);

        var foodSubtitle = document.createElement('div');
        foodSubtitle.className = 'food-subtitle';
        var foodBadge = document.createElement('div');
        foodBadge.className = 'badge';
        foodBadge.innerText = food.City;
        var foodCaption = document.createElement('div');
        foodCaption.className = 'caption';
        foodCaption.innerText = food.Town;
        foodSubtitle.appendChild(foodBadge);
        foodSubtitle.appendChild(foodCaption);
        foodContent.appendChild(foodSubtitle);

        var foodDescription = document.createElement('p');
        foodDescription.className = 'food-description';
        foodDescription.innerText = food.HostWords;
        foodContent.appendChild(foodDescription);

        foodItem.appendChild(foodImage);
        foodItem.appendChild(foodContent);

        // foods.appendChild(foodItem);
      }
    }
  }

  function populatePaginator() {
    var paginator = document.getElementById('paginator');
    paginator.innerHTML = '';
    var text = document.createElement('div');
    text.className = 'inline-flex';
    text.innerText = '美食頁次 ' + currentPage + '/' + totalPages;
    var buttonGroup = document.createElement('div');
    buttonGroup.className = 'button-group';

    for (var i = 0; i < totalPages; i++) {
      var button = document.createElement('button');
      button.className = 'button';
      if (i === currentPage - 1) button.className += ' button-active';
      button.dataset.page = i + 1;
      button.innerText = (i + 1).toString();
      button.setAttribute('type', 'button');
      button.addEventListener('click', paginatorEventHandler, false);
      buttonGroup.appendChild(button);
    }

    paginator.appendChild(text);
    paginator.appendChild(buttonGroup);
  }

  function paginatorEventHandler(e) {
    var pageButtons = document.querySelectorAll(
      '#paginator > .button-group > .button'
    );
    if (pageButtons) {
      for (var i = 0; i < pageButtons.length; i++) {
        pageButtons[i].className = 'button';
      }
    }

    if (e.target.className.indexOf('button-active') <= 0) {
      e.target.className += ' button-active';
      currentPage = e.target.dataset.page;
    }

    populateFoods(displayMode);
    populatePaginator();
  }

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
