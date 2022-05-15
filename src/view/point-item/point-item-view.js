import {createElement} from '../../render';
import createPointTemplate from './point-item-tpl';

export default class PointItemView {
  #element = null;
  #boardPoint = null;

  constructor(boardPoint) {
    this.#boardPoint = boardPoint;
  }

  get template() {
    return createPointTemplate(this.#boardPoint);
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
