import { render } from '../render';
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

    this.#boardPoints.forEach((point) => this.#renderPoint(point, this.#boardDestination[0]));
  }

  #renderPoint = (point, destination) => {
    const pointComponent = new PointItemView(point);
    const editFormComponent = new EditFormView(point, destination);


    const replacePointToEditForm = () => {
      this.#piontListComponent.element.replaceChild(editFormComponent.element, pointComponent.element);
    };

    const replaceEditFormToPoint = () => {
      this.#piontListComponent.element.replaceChild(pointComponent.element, editFormComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToEditForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editFormComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceEditFormToPoint();
      document.addEventListener('keydown', onEscKeyDown);
      document.removeEventListener('keydown', onEscKeyDown);
    });

    editFormComponent.element.querySelector('form.event--edit').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#piontListComponent.element);
  };
}
