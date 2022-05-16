import { createElement } from '../../render';
import addNewFormTemplate from './add-form-tpl';

export default class AddFormView {
  #element = null;

  get template() {
    return addNewFormTemplate();
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
