
import EditFormView from '../view/edit-form/edit-form-view';
import PiontListView from '../view/point-list/point-list-view';
import PointItemView from '../view/point-item/point-item-view';
import PiontListEmptyView from '../view/point-list-empty/point-list-empty-view';
import { isEscapePressed } from '../utils';
import { render, replace } from '../framework/render';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #destinationModel = null;
  #boardDestination = null;
  #boardPoints = [];

  #piontListComponent = new PiontListView();

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
      render(new PiontListEmptyView()/*Вьюха заглушки*/, this.#boardContainer); //Отрисовать заглушку в контейнер, если нет точек
    } else {
      render(this.#piontListComponent, this.#boardContainer); //Отрисовать точки в контейнер, если они есть
      this.#boardPoints.forEach((point) => this.#renderPoint(point, this.#boardDestination[0])); //Рендерит каждую точку из массива точек, плюс добавляет информацию про точку
    }
  }

  #renderPoint (point, destination) { //Отрисовывает точки
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
