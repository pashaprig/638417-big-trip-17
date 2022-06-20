import PiontListView from '../view/point-list/point-list-view';
import PiontListEmptyView from '../view/point-list-empty/point-list-empty-view';
import { remove, render, RenderPosition } from '../framework/render';
import SortView from '../view/sort/sort-view';
import PointPresenter from './point-presenter';
import { sortPointByPrice, sortByTime } from '../utils';
import { SortType, UpdateType, UserAction } from '../consts';
import { allOffers } from '../mock/offer-mock';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;

  #allOffers = allOffers;
  #destinationModel = null;

  #boardDestinations = [];
  #pointPresenter = new Map();
  #currentSortType = SortType.DEFAULT;


  #piontListComponent = new PiontListView();
  #piontListEmptyComponent = new PiontListEmptyView();
  #sortComponent = null;

  constructor(boardContainer, pointsModel, destinationModel) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#destinationModel = destinationModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortPointByPrice);
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortByTime);
      case SortType.DEFAULT:
        return this.#pointsModel.points;
    }

    return this.#pointsModel.points;
  }

  init() { // Инициация пресентера
    this.#boardDestinations = [...this.#destinationModel.destinations]; //Создаёт точки

    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data, this.#allOffers, this.#boardDestinations);
        break;
      case UpdateType.MINOR:
        this.#clearPointList();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearPointList({ resetSortType: true });
        this.#renderBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#renderBoard();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#piontListComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderNoPoints = () => { //Отрисовать заглушку в контейнер, если нет точек
    render(this.#piontListEmptyComponent, this.#piontListComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderPointList = () => { //Отрисовывает список для точек
    render(this.#piontListComponent, this.#boardContainer, RenderPosition.BEFOREEND);
  };

  #renderPoint(point, offers, destinations) { //Отрисовывает точку
    const pointPresenter = new PointPresenter(this.#piontListComponent.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point, offers, destinations);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints = (points) => { //Отрисовывает точки
    points.forEach((point) => this.#renderPoint(point, this.#allOffers, this.#boardDestinations));
  };

  #clearPointList = ({ resetSortType = false } = {}) => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#piontListEmptyComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #renderBoard() { //Отрисовывает контейнер для точек
    const points = this.points;
    const pointsCount = points.length;

    if (pointsCount === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderPointList();
    this.#renderSort();
    this.#renderPoints(this.points);
  }
}
