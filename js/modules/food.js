export function populateFoods(displayMode) {
  var data = getData(selectedCity, selectedTown, currentPage);
  var foods = document.getElementById('foods');
  foods.className = 'col';
  foods.innerHTML = '';

  if (mode === 'table') {
    foods.classList.add('overflow-x-auto');
    var foodTable = document.createElement('table');
    foodTable.className =
      'table table-striped table-hover table-bordered food__table';

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
      foodTableBodyId.classList.add('food__table--color-gray');
      foodTableBodyId.classList.add('text-right');
      foodTableBodyId.innerText = (
        i +
        1 +
        (currentPage - 1) * pageSize
      ).toString();
      foodTableBodyRow.appendChild(foodTableBodyId);
      var foodTableBodyCity = document.createElement('td');
      foodTableBodyCity.classList.add('food__table--color-gray');
      foodTableBodyCity.innerText = food.City;
      foodTableBodyRow.appendChild(foodTableBodyCity);
      var foodTableBodyTown = document.createElement('td');
      foodTableBodyTown.classList.add('food__table--color-gray');
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
    foods.appendChild(foodTable);
  } else if (mode === 'grid') {
    for (var i = 0; i < data.length; i++) {
      foods.classList.add('grid');
      foods.classList.add('grid-1');
      foods.classList.add('grid-md-2');
      var food = data[i];
      var foodItem = document.createElement('div');
      foodItem.className = 'food food__grid';

      var foodImage = document.createElement('div');
      foodImage.className = 'food__img';
      var img = document.createElement('img');
      img.src = food.PicURL;
      img.alt = food.Name;
      img.loading = 'lazy';
      foodImage.appendChild(img);
      foodItem.appendChild(foodImage);

      var foodContent = document.createElement('div');
      foodContent.className = 'food__content';
      var foodSubtitle = document.createElement('div');
      foodSubtitle.className = 'food__subtitle';
      var foodBadge = document.createElement('div');
      foodBadge.className = 'badge';
      foodBadge.innerText = food.City;
      var foodCaption = document.createElement('div');
      foodCaption.className = 'food__caption';
      foodCaption.innerText = food.Town;
      foodSubtitle.appendChild(foodBadge);
      foodSubtitle.appendChild(foodCaption);
      foodContent.appendChild(foodSubtitle);
      var foodTitle = document.createElement('h2');
      foodTitle.className = 'food__title';
      foodTitle.innerText = food.Name;
      foodContent.appendChild(foodTitle);

      var foodDescription = document.createElement('p');
      foodDescription.className = 'food__description';
      foodDescription.innerText = food.HostWords;
      foodContent.appendChild(foodDescription);

      foodItem.appendChild(foodImage);
      foodItem.appendChild(foodContent);

      foods.appendChild(foodItem);
    }
  } else {
    for (var i = 0; i < data.length; i++) {
      var food = data[i];
      var foodItem = document.createElement('div');
      foodItem.className = 'food food__list';

      var foodImage = document.createElement('div');
      foodImage.className = 'food__img';
      var img = document.createElement('img');
      img.src = food.PicURL;
      img.alt = food.Name;
      img.loading = 'lazy';
      foodImage.appendChild(img);

      var foodContent = document.createElement('div');
      foodContent.className = 'food__content';
      var foodTitle = document.createElement('h2');
      foodTitle.classList.add('food__title');
      foodTitle.innerText = food.Name;
      foodContent.appendChild(foodTitle);

      var foodSubtitle = document.createElement('div');
      foodSubtitle.className = 'food__subtitle';
      var foodBadge = document.createElement('div');
      foodBadge.className = 'badge';
      foodBadge.innerText = food.City;
      var foodCaption = document.createElement('div');
      foodCaption.className = 'food__caption';
      foodCaption.innerText = food.Town;
      foodSubtitle.appendChild(foodBadge);
      foodSubtitle.appendChild(foodCaption);
      foodContent.appendChild(foodSubtitle);

      var foodDescription = document.createElement('p');
      foodDescription.className = 'food__description';
      foodDescription.innerText = food.HostWords;
      foodContent.appendChild(foodDescription);

      foodItem.appendChild(foodImage);
      foodItem.appendChild(foodContent);

      foods.appendChild(foodItem);
    }
  }
}
