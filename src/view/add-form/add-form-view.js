import AbstractView from '../../framework/view/abstract-view.js';
import addNewFormTemplate from './add-form-tpl';

export default class AddFormView extends AbstractView {
  get template() {
    return addNewFormTemplate();
  }
}
