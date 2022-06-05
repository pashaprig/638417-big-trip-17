import { isEscapePressed } from '../utils';
import PointItemView from '../view/point-item/point-item-view';
import EditFormView from '../view/edit-form/edit-form-view';
import { render, replace, remove } from '../framework/render.js';
import { Mode } from '../consts';


export default class PointPresenter {
  #pointListContainer = null;
  #changeData = null;
  #changeMode = null;

  #pointComponent = null;
  #editFormComponent = null;

  #point = null;
  #destination = null;
  #mode = Mode.DEFAULT;

  constructor(pointListContainer, changeData, changeMode) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point, destination) => {
    this.#point = point;
    this.#destination = destination;

    const prevPointComponent = this.#pointComponent;
    const prevEditFormComponent = this.#editFormComponent;

    this.#pointComponent = new PointItemView(point); //Вьюха точки
    this.#editFormComponent = new EditFormView(point, destination); //Вьюха формы редактирования

    this.#pointComponent.setPointButtonOpenHandler(this.#handleEditClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#editFormComponent.setFormButtonCloseHandler(this.#handleCloseClick);
    this.#editFormComponent.setFormSubmitHandler(this.#handleFormSubmit);

    if (prevPointComponent === null || prevEditFormComponent === null) {
      render(this.#pointComponent, this.#pointListContainer); //Отрисовать точку, <li> в обёртку для точек <ul>
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editFormComponent, prevEditFormComponent);
    }

    remove(prevPointComponent);
    remove(prevEditFormComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#editFormComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editFormComponent.reset(this.#point);
      this.#replaceEditFormToPoint();
    }
  };

  #replacePointToEditForm = () => { //замена точки на форму редактирования
    replace(this.#editFormComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceEditFormToPoint = () => { // Замена формы редактирования на точку
    replace(this.#pointComponent, this.#editFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt) => { //Отработка нажатия на Esc
    if (isEscapePressed(evt)) {
      evt.preventDefault();
      this.#editFormComponent.reset(this.#point);
      this.#replaceEditFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleEditClick = () => {
    this.#replacePointToEditForm();
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite}); // changeData если нажать на звёздочку, не могу понять, что провоцирует ошибку
  };

  #handleCloseClick = () => {
    this.#replaceEditFormToPoint();
  };

  #handleFormSubmit = (point) => {
    this.#changeData(point);
    this.#replaceEditFormToPoint();
  };
}
