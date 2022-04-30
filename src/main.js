import BoardPresenter from './presenter/board-presenter';
import { render } from './render';
import FilterView from './view/filter-view';
import SortView from './view/sort-view';

const pageHeader = document.querySelector('.page-header');
const tripControls = pageHeader.querySelector('.trip-controls__filters');

const pageMain = document.querySelector('.page-main');
const tripEvents = pageMain.querySelector('.trip-events');

const boardPresenter = new BoardPresenter();

render(new FilterView(), tripControls);
render(new SortView(), tripEvents);

boardPresenter.init(tripEvents);

