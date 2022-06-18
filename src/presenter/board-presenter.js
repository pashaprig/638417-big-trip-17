import PiontListView from '../view/point-list/point-list-view';
import PiontListEmptyView from '../view/point-list-empty/point-list-empty-view';
import { render, RenderPosition } from '../framework/render';
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
  #sortComponent = new SortView();

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
    }

    return this.#pointsModel.points;
  }

  init() { // Инициация пресентера
    this.#boardDestinations = [...this.#destinationModel.destinations]; //Создаёт точки

    this.#renderBoard();
  }

  #renderBoard() { //Отрисовывает контейнер для точек
    if (!this.#pointsModel.points.length) {
      this.#renderNoTasks();
      return;
    }
    this.#renderSort();
    this.#renderPointList();
    this.#renderPoints();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updateTask(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addTask(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deleteTask(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenter.get(data.id).init(data, this.#allOffers, this.#boardDestinations);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#renderPoints();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderNoTasks = () => { //Отрисовать заглушку в контейнер, если нет точек
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

  #renderPoints = () => { //Отрисовывает точки
    this.#pointsModel.points.forEach((point) => this.#renderPoint(point, this.#allOffers, this.#boardDestinations));
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };
}
