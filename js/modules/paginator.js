import { Dom } from './dom.js';
import { initializeFoods } from './food.js';

export function initializePaginator() {
  const totalPages = window.sessionStorage.getItem('totalPages');
  const currentPage = window.sessionStorage.getItem('currentPage');

  const paginator = new Dom().getById('Paginator');
  let paginatorHtml = '';
  if (paginator) {
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
      button.setDataSet({ page: i + 1 });
      button.setInnerText(`${i + 1}`);
      button.setAttribute('type', 'button');
      buttonsHtml += button.toString();
    }
    buttonGroup.setInnerHtml(buttonsHtml);

    paginatorHtml += text.toString();
    paginatorHtml += buttonGroup.toString();
    paginator.setInnerHtml(paginatorHtml);

    paginator.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const activeButton = document.querySelector(
          '#Paginator .button-active'
        );
        activeButton.classList.remove('button-active');
        e.target.classList.add('button-active');
        window.sessionStorage.setItem('currentPage', e.target.dataset.page);

        initializeFoods();
      }
    });
  }
}

export function resetCurrentPage() {
  window.sessionStorage.setItem('currentPage', 1);
}
