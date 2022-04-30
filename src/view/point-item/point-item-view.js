import {createElement} from '../../render.js';
import createPointTemplate from './point-item-tpl.js';

export default class PointItemView {
  getTemplate() {
    return createPointTemplate();
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
