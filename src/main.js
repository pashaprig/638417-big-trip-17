import DestinationModel from './model/destination-model';
import PointModel from './model/point-items-model';
import BoardPresenter from './presenter/board-presenter';
import { render } from './framework/render';
import FilterView from './view/filter/filter-view';
import FilterModel from './model/filter-model';

const filters = [
  {
    type: 'all',
    name: 'ALL',
    count: 0,
  },
];

const pageHeader = document.querySelector('.page-header');
const tripControls = pageHeader.querySelector('.trip-controls__filters'); //Блок в хедере страницы для отрисовки контролов

const pageMain = document.querySelector('.page-main');
const tripEvents = pageMain.querySelector('.trip-events'); //Блок в мейне страницы для отрисовки информации про точки/места

const pointsModel = new PointModel(); //Массив точек/мест
const destinationModel = new DestinationModel(); //Массив информации про точки/места

const boardPresenter = new BoardPresenter(tripEvents, pointsModel, destinationModel);

const filterModel = new FilterModel();

render(new FilterView(filters, 'all'), tripControls); // Отрисовывает фильтры в блок для контролов

boardPresenter.init();
