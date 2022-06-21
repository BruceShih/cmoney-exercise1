import { initializeFoods } from './food.js';

export let displayMode = 'list';

export function initializeModeSwitcher() {
  const modeSwitchers = document.querySelectorAll(
    '#Mode-switcher .button-icon'
  );
  if (modeSwitchers) {
    modeSwitchers.forEach((switcher, index) => {
      if (index === 0) switcher.classList.add('button-active');
      switcher.addEventListener('click', modeSwitcherEventHandler, false);
    });
  }
}

function modeSwitcherEventHandler(e) {
  let previousActiveModeSwitcher = document.querySelector(
    '#Mode-switcher .button-active'
  );
  if (previousActiveModeSwitcher)
    previousActiveModeSwitcher.classList.remove('button-active');

  e.target.classList.add('button-active');
  displayMode = e.target.dataset.mode;

  initializeFoods();
}
