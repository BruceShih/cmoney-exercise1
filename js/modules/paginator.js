import { Dom } from './dom';
import { displayMode } from './mode';

export let currentPage = 1;
export let pageSize = 10;

export function initializePaginator(totalPages) {
  let paginatorHtml = '';
  const paginator = new Dom().getById('paginator');
  paginator.setInnerHtml('');
  const text = new Dom('div');
  text.addClass('inline-flex');
  text.setInnerText(`美食頁次 ${currentPage}/${totalPages}`);
  const buttonGroup = new Dom('div');
  buttonGroup.addClass('button-group');

  let buttonsHtml = '';
  for (var i = 0; i < totalPages; i++) {
    const button = new Dom('button');
    button.addClass('button');
    if (i === currentPage - 1) button.addClass('button-active');
    // not implement setter for dataset yet
    button.dataset.page = i + 1;
    button.setInnerText(`${i + 1}`);
    button.setAttribute('type', 'button');
    button.addEventListener('click', paginatorEventHandler, false);
    buttonsHtml += button.toString();
  }
  buttonGroup.setInnerHtml(buttonsHtml);

  paginatorHtml += text.toString();
  paginatorHtml += buttonGroup.toString();
  paginator.setInnerHtml(paginatorHtml);
}

function paginatorEventHandler(e) {
  const currentActivePageButton = document.querySelector(
    '#paginator > .button-group > .button-active'
  );
  currentActivePageButton.classList.remove('button-active');

  e.target.classList.add('button-active');
  currentPage = e.target.dataset.page;

  // TODO: import this
  populateFoods(displayMode);
}
