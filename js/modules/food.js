import { Dom } from './dom.js';
import { getData } from './data.js';
import { selectedCity, selectedTown } from './location.js';
import { displayMode } from './mode.js';

export function initializeFoods() {
  const currentPage = window.sessionStorage.getItem('currentPage') || 1;
  const data = getData(selectedCity, selectedTown, currentPage);

  switch (displayMode) {
    case 'table':
      renderFoodTable(data);
      break;
    case 'grid':
      renderFoodGrid(data);
      break;
    case 'list':
    default:
      renderFoodList(data);
      break;
  }
}

function renderFoodList(rows) {
  const foods = new Dom().getById('Foods');
  foods.removeAllClass();
  foods.setInnerHtml('');

  let foodHtml = '';
  if (rows instanceof Array && rows.length > 0) {
    rows.forEach((row) => {
      let foodItemHtml = '';
      let foodContentHtml = '';
      let foodSubtitleHtml = '';
      const foodItem = createFoodItem('list');
      const foodImage = createFoodThumbnail(row.PicURL, row.Name);

      const foodContent = createFoodElement('div', ['food__content']);
      const foodTitle = row.Url
        ? createFoodLink(row.Url, ['food__title'], row.Name)
        : createFoodElement('h2', ['food__title'], row.Name);
      foodContentHtml += foodTitle.toString();

      const foodSubtitle = createFoodElement('div', ['food__subtitle']);
      const foodBadge = createFoodElement('div', ['badge'], row.City);
      const foodCaption = createFoodElement('div', ['food__caption'], row.Town);
      foodSubtitleHtml += foodBadge.toString();
      foodSubtitleHtml += foodCaption.toString();
      foodSubtitle.setInnerHtml(foodSubtitleHtml);
      foodContentHtml += foodSubtitle.toString();

      const foodDescription = createFoodElement(
        'p',
        ['food__description'],
        row.HostWords
      );
      foodContentHtml += foodDescription.toString();
      foodContent.setInnerHtml(foodContentHtml);

      foodItemHtml += foodImage.toString();
      foodItemHtml += foodContent.toString();
      foodItem.setInnerHtml(foodItemHtml);

      foodHtml += foodItem.toString();
    });

    foods.setInnerHtml(foodHtml);
  }
}

function renderFoodTable(rows) {
  const currentPage = window.sessionStorage.getItem('currentPage');
  const foods = new Dom().getById('Foods');
  foods.removeAllClass();
  foods.addClass('overflow-x-auto');
  foods.setInnerHtml('');

  const foodTable = createFoodTable();
  let foodTableHtml = '';

  const foodTableHead = createFoodElement('thead');
  const foodTableHeadRow = createFoodElement('tr');
  let foodTableHeadRowHtml = '';
  const headers = ['編號', '行政區域', '鄉鎮區', '商家', '地址'];
  headers.forEach((header) => {
    const foodTableHeadRowCell = createFoodElement('th');
    foodTableHeadRowCell.setInnerText(header);
    foodTableHeadRowHtml += foodTableHeadRowCell.toString();
  });
  foodTableHeadRow.setInnerHtml(foodTableHeadRowHtml);
  foodTableHead.setInnerHtml(foodTableHeadRow.toString());
  foodTableHtml += foodTableHead.toString();

  const foodTableBody = createFoodElement('tbody');
  let foodTableBodyHtml = '';
  if (rows instanceof Array && rows.length > 0) {
    rows.forEach((row, index) => {
      const foodTableBodyRow = createFoodElement('tr');
      let foodTableBodyRowHtml = '';

      const foodTableBodyId = createFoodElement(
        'td',
        ['food__table--color-gray', 'text-right'],
        `${index + 1 + (currentPage - 1) * 10}`
      );
      foodTableBodyRowHtml += foodTableBodyId.toString();
      const foodTableBodyCity = createFoodElement(
        'td',
        ['food__table--color-gray'],
        row.City
      );
      foodTableBodyRowHtml += foodTableBodyCity.toString();
      const foodTableBodyTown = createFoodElement(
        'td',
        ['food__table--color-gray'],
        row.Town
      );
      foodTableBodyRowHtml += foodTableBodyTown.toString();
      const foodTableBodyName = createFoodElement('td', [], row.Name);
      const foodTableBodyLink = createFoodLink(row.Url, [], row.Name);
      if (row.Url) foodTableBodyName.setInnerHtml(foodTableBodyLink.toString());
      foodTableBodyRowHtml += foodTableBodyName.toString();
      const foodTableBodyAddress = createFoodElement('td', [], row.Address);
      foodTableBodyRowHtml += foodTableBodyAddress.toString();
      foodTableBodyRow.setInnerHtml(foodTableBodyRowHtml);

      foodTableBodyHtml += foodTableBodyRow.toString();
    });

    foodTableBody.setInnerHtml(foodTableBodyHtml);
    foodTableHtml += foodTableBody.toString();
  }

  foodTable.setInnerHtml(foodTableHtml);
  foods.setInnerHtml(foodTable.toString());
}

function renderFoodGrid(rows) {
  const foods = new Dom().getById('Foods');
  foods.removeAllClass();
  foods.addClass('col');
  foods.addClass('grid');
  foods.addClass('grid-1');
  foods.addClass('grid-md-2');
  foods.setInnerHtml('');

  let foodHtml = '';
  if (rows instanceof Array && rows.length > 0) {
    rows.forEach((row) => {
      let foodItemHtml = '';
      let foodContentHtml = '';
      let foodSubtitleHtml = '';
      const foodItem = row.Url
        ? createFoodItem('grid', true, row.Url)
        : createFoodItem('grid');
      const foodImage = createFoodThumbnail(row.PicURL, row.Name);
      foodItemHtml += foodImage.toString();

      const foodContent = createFoodElement('div', ['food__content']);
      const foodSubtitle = createFoodElement('div', ['food__subtitle']);
      const foodBadge = createFoodElement('div', ['badge'], row.City);
      const foodCaption = createFoodElement('div', ['food__caption'], row.Town);
      foodSubtitleHtml += foodBadge.toString();
      foodSubtitleHtml += foodCaption.toString();
      foodSubtitle.setInnerHtml(foodSubtitleHtml);
      foodContentHtml += foodSubtitle.toString();
      const foodTitle = createFoodElement('h2', ['food__title'], row.Name);
      foodContentHtml += foodTitle.toString();

      const foodDescription = createFoodElement(
        'p',
        ['food__description'],
        row.HostWords
      );
      foodContentHtml += foodDescription.toString();
      foodContent.setInnerHtml(foodContentHtml);

      foodItemHtml += foodContent.toString();
      foodItem.setInnerHtml(foodItemHtml);

      foodHtml += foodItem.toString();
    });

    foods.setInnerHtml(foodHtml);
  }
}

function createFoodTable() {
  const table = new Dom('table');
  table.setClassList([
    'table',
    'table-striped',
    'table-hover',
    'table-bordered',
    'food__table'
  ]);
  return table;
}

function createFoodItem(mode, clickable, link) {
  switch (mode) {
    case 'grid':
      const gridItem = clickable ? new Dom('a') : new Dom('div');
      gridItem.setClassList(['food', 'food__grid']);
      if (clickable) {
        gridItem.setAttribute('href', link);
        gridItem.setAttribute('target', '_blank');
      }
      return gridItem;
    case 'list':
    default:
      const listItem = new Dom('div');
      listItem.setClassList(['food', 'food__list']);
      return listItem;
  }
}

function createFoodThumbnail(src, alt) {
  const foodThumbnail = new Dom('div');
  foodThumbnail.addClass('food__img');
  const img = new Dom('img');
  img.setAttribute('alt', alt);
  img.setAttribute('loading', 'lazy');
  img.setAttribute('src', src);
  foodThumbnail.setInnerHtml(img.toString());
  return foodThumbnail;
}

function createFoodLink(url, classList, innerText) {
  const element = new Dom('a');
  element.setAttribute('href', url);
  element.setAttribute('target', '_blank');
  if (classList) element.setClassList(classList);
  if (innerText) element.setInnerText(innerText);
  return element;
}

function createFoodElement(tag, classList, innerText) {
  const element = new Dom(tag);
  if (classList) element.setClassList(classList);
  if (innerText) element.setInnerText(innerText);
  return element;
}
