
import EditFormView from '../view/edit-form/edit-form-view';
import PiontListView from '../view/point-list/point-list-view';
import PointItemView from '../view/point-item/point-item-view';
import PiontListEmptyView from '../view/point-list-empty/point-list-empty-view';
import { isEscapePressed } from '../utils';
import {render, RenderPosition, replace} from '../framework/render.js';
import SortView from '../view/sort/sort-view';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #destinationModel = null;
  #boardDestination = null;
  #boardPoints = [];

  #piontListComponent = new PiontListView();
  #piontListEmptyComponent = new PiontListEmptyView();
  #sortComponent = new SortView();

  constructor(boardContainer, pointsModel, destinationModel) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#destinationModel = destinationModel;
  }

  init() { // Инициация пресентера
    this.#boardPoints = [...this.#pointsModel.points]; //Создаёт точки
    this.#boardDestination = this.#destinationModel.getDestinations(); //Создаёт информацию про точки

    this.#renderBoard();
  }

  #renderBoard () { //Отрисовывает контейнер для точек
    if (!this.#boardPoints.length) {
      this.#renderNoTasks(); //Отрисовать заглушку в контейнер, если нет точек
    } else {
      this.#renderSort(); // Отрисовывает элементы сортировки в контейнер
      this.#renderPiontList(); // Отрисовывает обёрту списка в контейнер
      this.#boardPoints.forEach((point) => this.#renderPoint(point, this.#boardDestination[0])); //Рендерит каждую точку из массива точек, плюс добавляет информацию про точку
    }
  }

  #renderSort = () => {
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  };

  #renderNoTasks = () => {
    render(this.#piontListEmptyComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  };

  #renderPiontList = () => {
    render(this.#piontListComponent, this.#boardContainer, RenderPosition.BEFOREEND);
  };

  #renderPoint (point, destination) { //Отрисовывает точку
    const pointComponent = new PointItemView(point); //Вьюха точки
    const editFormComponent = new EditFormView(point, destination); //Вьюха формы редактирования

    const replacePointToEditForm = () => { //замена точки на форму редактирования
      replace(editFormComponent, pointComponent);
    };

    const replaceEditFormToPoint = () => { // Замена формы редактирования на точку
      replace(pointComponent, editFormComponent);
    };

    const onEscKeyDown = (evt) => { //Отработка нажатия на Esc
      if (isEscapePressed(evt)) {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setPointButtonOpenHandler(() => { //При клике на кнопку показать форму в точке
      replacePointToEditForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editFormComponent.setFormButtonCloseHandler(() => { //При клике на кнопку закрыть форму в форме
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    editFormComponent.setFormSubmitHandler(() => { //При сабмите формы редактирования
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#piontListComponent.element); //Отрисовать точку, <li> в обёртку для точек <ul>
  }
}
