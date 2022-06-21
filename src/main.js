import DestinationModel from './model/destination-model';
import PointModel from './model/point-items-model';
import BoardPresenter from './presenter/board-presenter';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import NewPointButtonView from './view/new-point-button/new-point-button-view';
import { render, RenderPosition } from './framework/render';
import MenuView from './view/menu/menu-view';

const pageHeader = document.querySelector('.page-header');
const siteTripMainElement = pageHeader.querySelector('.trip-main');
const tripControls = pageHeader.querySelector('.trip-controls__filters'); //Блок в хедере страницы для отрисовки контролов

const pageMain = document.querySelector('.page-main');
const tripEvents = pageMain.querySelector('.trip-events'); //Блок в мейне страницы для отрисовки информации про точки/места

const pointsModel = new PointModel(); //Массив точек/мест
const filterModel = new FilterModel();
const destinationModel = new DestinationModel(); //Массив информации про точки/места

const boardPresenter = new BoardPresenter(tripEvents, pointsModel, destinationModel, filterModel);
const filterPresenter = new FilterPresenter(tripControls, filterModel, pointsModel);
const newPointButtonComponent = new NewPointButtonView();

render(new MenuView(), siteTripMainElement, RenderPosition.AFTERBEGIN);
const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  boardPresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};

render(newPointButtonComponent, siteTripMainElement);
newPointButtonComponent.setClickHandler(handleNewPointButtonClick);

filterPresenter.init();
boardPresenter.init();
