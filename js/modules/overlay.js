function show() {
  const element = document.getElementById('loader');
  if (element)
    element.classList.add('show');
}

function hide() {
  const element = document.getElementById('loader');
  if (element)
    element.classList.remove('show');
}

export const overlay = {
  show,
  hide
};
