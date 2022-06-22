import { initializeFoods } from './food.js';

export let displayMode = 'list';

export function initializeModeSwitcher() {
  const modeSwitchers = document.querySelectorAll(
    '#ModeSwitcher .button-icon'
  );
  if (modeSwitchers) {
    modeSwitchers.forEach((switcher, index) => {
      if (index === 0) {
        switcher.classList.add('button-active');
        switcher.classList.add('bg-transparent');
      }
      switcher.addEventListener('click', modeSwitcherEventHandler);
    });
  }
}

function modeSwitcherEventHandler(e) {
  let previousActiveModeSwitcher = document.querySelector(
    '#ModeSwitcher .button-active'
  );
  if (previousActiveModeSwitcher) {
    previousActiveModeSwitcher.classList.remove('button-active');
    previousActiveModeSwitcher.classList.remove('bg-transparent');
  }

  e.target.classList.add('button-active');
  e.target.classList.add('bg-transparent');
  displayMode = e.target.dataset.mode;

  initializeFoods();
}
