import {createElement} from '../../render';
import createPointTemplate from './point-item-tpl';

export default class PointItemView {
  constructor(boardPoint) {
    this.boardPoint = boardPoint;
  }

  getTemplate() {
    return createPointTemplate(this.boardPoint);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
