import AbstractView from '../../framework/view/abstract-view.js';
import createNewEditFormTemplate from './edit-form-tpl.js';

export default class EditFormView extends AbstractView {
  #boardPoint = null;
  #boardDestination = null;

  constructor(boardPoint, boardDestination){
    super();
    this.#boardPoint = boardPoint;
    this.#boardDestination = boardDestination;
  }

  get template() {
    return createNewEditFormTemplate(this.#boardPoint, this.#boardDestination);
  }
}
