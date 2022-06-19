import DestinationModel from './model/destination-model';
import PointModel from './model/point-items-model';
import BoardPresenter from './presenter/board-presenter';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';

const pageHeader = document.querySelector('.page-header');
const tripControls = pageHeader.querySelector('.trip-controls__filters'); //Блок в хедере страницы для отрисовки контролов

const pageMain = document.querySelector('.page-main');
const tripEvents = pageMain.querySelector('.trip-events'); //Блок в мейне страницы для отрисовки информации про точки/места

const pointsModel = new PointModel(); //Массив точек/мест
const filterModel = new FilterModel();
const destinationModel = new DestinationModel(); //Массив информации про точки/места

const boardPresenter = new BoardPresenter(tripEvents, pointsModel, destinationModel);
const filterPresenter = new FilterPresenter(tripControls, filterModel, pointsModel);

filterPresenter.init();
boardPresenter.init();
