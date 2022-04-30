import { render } from '../render';
import AddFormView from '../view/add-form-view';
import EditFormView from '../view/edit-form-view';
import PiontListView from '../view/point-list-view';
import PointView from '../view/point-view';

export default class BoardPresenter {
  piontListComponent = new PiontListView();

  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    render(this.piontListComponent, this.boardContainer);
    render(new EditFormView(), this.piontListComponent.getElement());
    render(new AddFormView(), this.piontListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.piontListComponent.getElement());
    }
  };
}
