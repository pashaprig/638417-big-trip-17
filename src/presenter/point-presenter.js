import { isEscapePressed } from '../utils';
import PointItemView from '../view/point-item/point-item-view';
import EditFormView from '../view/edit-form/edit-form-view';
import { render, replace, remove } from '../framework/render.js';

export default class PointPresenter {
  #pointListContainer = null;
  #changeData = null;

  #pointComponent = null;
  #editFormComponent = null;

  #point = null;
  #destination = null;

  constructor(pointListContainer, changeData) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
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

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this.#pointListContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointListContainer.contains(prevEditFormComponent.element)) {
      replace(this.#editFormComponent, prevEditFormComponent);
    }

    remove(prevPointComponent);
    remove(prevEditFormComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#editFormComponent);
  };

  #replacePointToEditForm = () => { //замена точки на форму редактирования
    replace(this.#editFormComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceEditFormToPoint = () => { // Замена формы редактирования на точку
    replace(this.#pointComponent, this.#editFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => { //Отработка нажатия на Esc
    if (isEscapePressed(evt)) {
      evt.preventDefault();
      this.#replaceEditFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleEditClick = () => {
    this.#replacePointToEditForm();
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleCloseClick = () => {
    this.#replaceEditFormToPoint();
  };

  #handleFormSubmit = (point) => {
    this.#changeData(point);
    this.#replaceEditFormToPoint();
  };
}
