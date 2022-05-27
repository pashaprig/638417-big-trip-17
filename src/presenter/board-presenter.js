import PiontListView from '../view/point-list/point-list-view';
import PiontListEmptyView from '../view/point-list-empty/point-list-empty-view';
import { render, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort/sort-view';
import PointPresenter from './point-presenter';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #destinationModel = null;
  #boardDestination = null;
  #boardPoints = [];
  #pointPresenter = new Map();

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

  #renderBoard() { //Отрисовывает контейнер для точек
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

  #renderPoint(point, destination) { //Отрисовывает точку
    const pointPresenter = new PointPresenter(this.#piontListComponent.element);
    pointPresenter.init(point, destination);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };
}


