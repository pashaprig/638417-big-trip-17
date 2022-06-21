import { isEscapePressed } from '../utils';
import EditFormView from '../view/edit-form/edit-form-view';
import { render, remove, RenderPosition } from '../framework/render';
import { UserAction, UpdateType } from '../consts';
import { nanoid } from 'nanoid';

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

export default class PointNewPresenter {
  #pointListContainer = null;
  #changeData = null;
  #editFormComponent = null;
  #destroyCallback = null;

  #offers = null;
  #destinations = null;

  constructor(pointListContainer, changeData) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
  }

  init = (callback, offers, destinations) => {
    this.#destroyCallback = callback;

    if (this.#editFormComponent !== null) {
      return;
    }

    this.#offers = offers;
    this.#destinations = destinations;

    this.#editFormComponent = new EditFormView(BLANK_POINT, this.#offers, this.#destinations);

    this.#editFormComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#editFormComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#editFormComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#editFormComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#editFormComponent);
    this.#editFormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (isEscapePressed(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      { id: nanoid(), ...point },
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };
}
