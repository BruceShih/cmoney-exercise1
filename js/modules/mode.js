export let displayMode = 'list';

export function initializeModeSwitcher() {
  const modeSwitchers = document.querySelectorAll(
    '#mode-switcher .button-icon'
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
    '#mode-switcher .button-active'
  );
  previousActiveModeSwitcher.classList.remove('button-active');

  e.target.classList.add('button-active');
  displayMode = e.target.dataset.mode;

  // TODO: import this
  populateFoods(displayMode);
}
