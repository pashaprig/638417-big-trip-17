import {createElement} from '../../render.js';
import createNewEditFormTemplate from './edit-form-tpl.js';

export default class EditFormView {
  getTemplate() {
    return createNewEditFormTemplate();
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
