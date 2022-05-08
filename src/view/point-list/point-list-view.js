import {createElement} from '../../render.js';
import createPointListTemplate from './point-list-tpl.js';

export default class PiontListView {
  getTemplate() {
    return createPointListTemplate();
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
