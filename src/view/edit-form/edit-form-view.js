import {createElement} from '../../render.js';
import createNewEditFormTemplate from './edit-form-tpl.js';

export default class EditFormView {
  #element = null;
  #boardPoint = null;
  #boardDestination = null;

  constructor(boardPoint, boardDestination){
    this.#boardPoint = boardPoint;
    this.#boardDestination = boardDestination;
  }

  get template() {
    return createNewEditFormTemplate(this.#boardPoint, this.#boardDestination);
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
