import {createElement} from '../../render.js';
import createPointListEmptyTemplate from './point-list-empty.js';

export default class PiontListEmptyView {
  #element = null;

  get template() {
    return createPointListEmptyTemplate();
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
