function show() {
  const element = document.getElementById('loader');
  element.classList.add('show');
}

function hide() {
  const element = document.getElementById('loader');
  element.classList.remove('show');
}

export const overlay = {
  show,
  hide
};
