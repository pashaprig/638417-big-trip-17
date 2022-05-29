import PiontListView from '../view/point-list/point-list-view';
import PiontListEmptyView from '../view/point-list-empty/point-list-empty-view';
import { render, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort/sort-view';
import PointPresenter from './point-presenter';
import { updateItem, sortPointByPrice, sortByTime } from '../utils';
import { SortType } from '../const';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #destinationModel = null;
  #boardDestination = null;
  #boardPoints = [];
  #pointPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedBoardPoints = [];

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

    // исходный массив:
    this.#sourcedBoardPoints = [...this.#pointsModel.points];

    this.#renderBoard();
  }

  #renderBoard() { //Отрисовывает контейнер для точек
    if (!this.#boardPoints.length) {
      this.#renderNoTasks(); //Отрисовать заглушку в контейнер, если нет точек
      return;
    }
    this.#renderSort(); // Отрисовывает элементы сортировки в контейнер
    this.#renderPiontList(); // Отрисовывает обёртку списка в контейнер
    this.#boardPoints.forEach((point) => this.#renderPoint(point, this.#boardDestination[0])); //Рендерит каждую точку из массива точек, плюс добавляет информацию про точку

  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, this.#boardDestination[0]);
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case sortType.PRICE:
        this.#boardPoints.sort(sortPointByPrice);
        break;
      case sortType.TIME:
        this.#boardPoints.sort(sortByTime);
        break;
      default:
        this.#boardPoints = [...this.#sourcedBoardPoints];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    // - Очищаем список
    // - Рендерим список заново
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderNoTasks = () => {
    render(this.#piontListEmptyComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  };

  #renderPiontList = () => {
    render(this.#piontListComponent, this.#boardContainer, RenderPosition.BEFOREEND);
  };

  #renderPoint(point, destination) { //Отрисовывает точку
    const pointPresenter = new PointPresenter(this.#piontListComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point, destination);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };
}
