import { render } from '../render';
import AddFormView from '../view/add-form/add-form-view';
import EditFormView from '../view/edit-form/edit-form-view';
import PiontListView from '../view/point-list/point-list-view';
import PointItemView from '../view/point-item/point-item-view';

export default class BoardPresenter {
  piontListComponent = new PiontListView();

  init(boardContainer, pointsModel, destinationModel) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
    this.destinationModel = destinationModel;
    this.boardDestination = this.destinationModel.getDestinations();
    this.boardPoints = [...this.pointsModel.getPoints()];

    render(this.piontListComponent, this.boardContainer);
    render(new EditFormView(this.boardPoints[0], this.boardDestination[0]), this.piontListComponent.getElement());
    render(new AddFormView(), this.piontListComponent.getElement());

    for (let i = 0; i < this.boardPoints.length ; i++) {
      render(new PointItemView(this.boardPoints[i]), this.piontListComponent.getElement());
    }
  }
}
