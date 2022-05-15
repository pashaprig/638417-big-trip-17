import {createElement} from '../../render.js';
import createPointListTemplate from './point-list-tpl.js';

export default class PiontListView {
  #element = null;

  get template() {
    return createPointListTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
