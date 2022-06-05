import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import createNewEditFormTemplate from './edit-form-tpl';

export default class EditFormView extends AbstractStatefulView {

  #destination = null;

  constructor(point, destination) {
    super();
    this._state = EditFormView.parsePointToState(point);
    this.#destination = destination;

    this.#setInnerHandlers();
  }

  get template() {
    return createNewEditFormTemplate(this._state, this.#destination);
  }

  reset = (point) => {
    this.updateElement(
      EditFormView.parsePointToState(point),
    );
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormButtonCloseHandler(this._callback.click);
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form.event--edit').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditFormView.parseStateToPoint(this._state), this.#destination);
  };

  setFormButtonCloseHandler = (callback) => {
    this._callback.buttonClose = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formButtonCloseHandler);
  };

  #formButtonCloseHandler = () => {
    this._callback.buttonClose();
  };

  #pointTypeClickHandler = (evt) => {
    if (!evt.target.classList.contains('event__type-label')) {
      return;
    }

    this.updateElement({
      checkedType: evt.target.parentNode.querySelector('.event__type-input').value,
    });

  };

  #destinationChangeHandler = (evt) => {
    this.updateElement({
      checkedDestination: evt.target.value,
    });
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-btn').addEventListener('click', this.#pointTypeClickHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
  };

  static parsePointToState = (point) => ({
    ...point,
    checkedType: point.type,
    checkedDestination: point.destination
  });

  static parseStateToPoint = (state) => {
    const point = { ...state };

    if (point.checkedType !== point.type) {
      point.type = point.checkedType;
    }

    if (point.checkedDestination !== point.destination) {
      point.destination = point.checkedDestination;
    }

    delete point.checkedType;
    delete point.checkedDestination;

    return point;
  };
}
