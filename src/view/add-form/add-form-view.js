import {createElement} from '../../render';
import addNewFormTemplate from './add-form-tpl';

export default class AddFormView {
  getTemplate() {
    return addNewFormTemplate();
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
