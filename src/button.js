export default class Button {
  constructor(selector) {
    this.btnEl = document.querySelector(selector);
  }
  enable() {
    this.btnEl.disabled = false;
  }

  disable() {
    this.btnEl.disabled = true;
  }
}
