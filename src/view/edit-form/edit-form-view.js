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

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form.event--edit').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(this.#boardPoint, this.#boardDestination);
  };

  setFormButtonCloseHandler = (callback) => {
    this._callback.buttonClose = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formButtonCloseHandler);
  };

  #formButtonCloseHandler = () => {
    this._callback.buttonClose();
  };
}
