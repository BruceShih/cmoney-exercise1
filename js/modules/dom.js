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
    if (this._dom)
      this._dom.innerHTML = htmlString;
  }

  setInnerText(text) {
    if (this._dom)
      this._dom.innerText = text;
  }

  setAttribute(name, value) {
    if (this._dom)
      this._dom.setAttribute(name, value);
  }

  removeAttribute(name) {
    if (this._dom)
      this._dom.removeAttribute(name);
  }

  setClassList(classList) {
    if (this._dom) {
      if (classList.length > 0) {
        classList.forEach((newClass) => {
          this.addClass(newClass);
        })
      }
    }
  }

  setDataSet(dataSet) {
    if (this._dom) {
      const keys = Object.keys(dataSet);
      if (keys.length > 0) {
        keys.forEach((key) => {
          this._dom.dataset[key] = dataSet[key];
        });
      }
    }
  }

  addClass(newClass) {
    if (this._dom)
      this._dom.classList.add(newClass);
  }

  removeAllClass() {
    if (this._dom)
      this._dom.classList = '';
  }

  setValue(value) {
    if (this._dom)
      this._dom.value = value;
  }

  addEventListener(event, handler) {
    if (this._dom)
      this._dom.addEventListener(event, handler);
  }

  toString() {
    if (this._dom)
      return this._dom.outerHTML.toString();
  }
}
