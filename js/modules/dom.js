export class Dom {
  constructor(tag) {
    this._dom = document.createElement(tag);
  }

  get() {
    return this;
  }

  getById(id) {
    this._dom = document.getElementById(id);
    return this;
  }

  setInnerHtml(htmlString) {
    this._dom.innerHTML = sanitize(htmlString);
  }

  setInnerText(text) {
    this._dom.innerText = text;
  }

  setAttribute(name, value) {
    this._dom.setAttribute(name, value);
  }

  removeAttribute(name) {
    this._dom.removeAttribute(name);
  }

  setClassList(classList) {
    this._dom.classList = classList;
  }

  addClass(newClass) {
    this._dom.classList.add(newClass);
  }

  removeClass(oldClass) {
    this._dom.classList.remove(oldClass);
  }

  setValue(value) {
    this._dom.value = value;
  }

  appendTo(target) {
    target.appendChild(this._dom);
  }

  appendHtmlTo(target) {
    target.innerHTML += this._dom.innerHTML;
  }

  addEventListener(event, handler) {
    this._dom.addEventListener(event, handler);
  }

  toString() {
    return this._dom.innerHTML.toString();
  }

  sanitize(htmlString) {
    return htmlString.replace(/javascript:/gi, '').replace(/[^\w-_. ]/gi, (c) => {
      return `&#${c.charCodeAt(0)};`;
    });
  }
}
