import { createElement } from '../../render.js';
import createNewFilterTemplate from './filter-tpl.js';

export default class FilterView {
  #element = null;

  get template() {
    return createNewFilterTemplate();
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
