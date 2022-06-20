import PiontListView from '../view/point-list/point-list-view';
import PiontListEmptyView from '../view/point-list-empty/point-list-empty-view';
import { remove, render, RenderPosition } from '../framework/render';
import SortView from '../view/sort/sort-view';
import PointPresenter from './point-presenter';
import { sortPointByPrice, sortByTime, filter, sortDayUp } from '../utils';
import { FilterType, SortType, UpdateType, UserAction } from '../consts';
import { allOffers } from '../mock/offer-mock';
import PointNewPresenter from './point-new-presenter';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #allOffers = allOffers;
  #destinationModel = null;

  #boardDestinations = [];
  #pointPresenter = new Map();
  #pointNewPresenter = null;
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.ALL;


  #piontListComponent = new PiontListView();
  #piontListEmptyComponent = null;
  #sortComponent = null;

  constructor(boardContainer, pointsModel, destinationModel, filterModel) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#destinationModel = destinationModel;
    this.#filterModel = filterModel;

    this.#pointNewPresenter = new PointNewPresenter(this.#piontListComponent.element, this.#handleViewAction);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.PRICE:
        return filteredPoints.sort(sortPointByPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
      case SortType.DEFAULT:
        return filteredPoints.sort(sortDayUp);
    }

    return filteredPoints;
  }

  init() { // Инициация пресентера
    this.#boardDestinations = [...this.#destinationModel.destinations]; //Создаёт точки

    this.#renderBoard();
  }

  createPoint = (callback) => {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
    this.#pointNewPresenter.init(callback, this.#allOffers, this.#boardDestinations);
  };

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
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
    this.#piontListEmptyComponent = new PiontListEmptyView(this.#filterType);
    render(this.#piontListEmptyComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
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
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);

    if (this.#piontListEmptyComponent) {
      remove(this.#piontListEmptyComponent);
    }

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
