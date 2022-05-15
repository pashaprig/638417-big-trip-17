import { render } from '../render';
import AddFormView from '../view/add-form/add-form-view';
import EditFormView from '../view/edit-form/edit-form-view';
import PiontListView from '../view/point-list/point-list-view';
import PointItemView from '../view/point-item/point-item-view';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #destinationModel = null;
  #boardDestination = null;
  #boardPoints = [];

  #piontListComponent = new PiontListView();

  init(boardContainer, pointsModel, destinationModel) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#destinationModel = destinationModel;
    this.#boardDestination = this.#destinationModel.getDestinations();
    this.#boardPoints = [...this.#pointsModel.points];

    render(this.#piontListComponent, this.#boardContainer);
    // render(new EditFormView(this.#boardPoints[0], this.#boardDestination[0]), this.#piontListComponent.element);
    render(new AddFormView(), this.#piontListComponent.element);

    this.#boardPoints.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint = (point) => {
    const pointComponent = new PointItemView(point);

    render(pointComponent, this.#piontListComponent.element);
  };
}
