import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import createNewEditFormTemplate from './edit-form-tpl';

const BLANK_POINT = {
  basePrice: '',
  dateFrom: null,
  dateTo: null,
  destination: 'Kyiv',
  offers: [],
  type: 'flight',
  isFavorite: false,
  isStatusCreate: true,
};

export default class EditFormView extends AbstractStatefulView {
  #allOffers = null;
  #allDestinations = null;

  constructor(point = BLANK_POINT, allOffers, allDestinations) {
    super();

    this._state = EditFormView.parsePointToState(point);

    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;

    this.#setInnerHandlers();
  }

  get template() {
    return createNewEditFormTemplate(this._state, this.#allOffers, this.#allDestinations);
  }

  reset = (point) => {
    this.updateElement(
      EditFormView.parsePointToState(point),
    );
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormButtonCloseHandler(this._callback.buttonClose);
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form.event--edit').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditFormView.parseStateToPoint(this._state));
  };

  setFormButtonCloseHandler = (callback) => {
    this._callback.buttonClose = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formButtonCloseHandler);
  };

  #formButtonCloseHandler = () => {
    this._callback.buttonClose();
  };

  #changeTypeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.name !== 'event-type') {
      return;
    }

    this.updateElement({
      checkedType: evt.target.value,
      offers: [], // Вот тут я так понимаю
    });
  };

  #focusDestinationHandler = (evt) => {
    evt.preventDefault();
    evt.target.value = ''; // при фокусе обнуляем строку
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      checkedDestination: evt.target.value
    });
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('change', this.#changeTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('focus', this.#focusDestinationHandler);
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
