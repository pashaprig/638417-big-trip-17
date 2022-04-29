import { render } from './render';
import NewFilterView from './view/filter-view';
import NewSortView from './view/sort.-viewjs';

const pageHeader = document.querySelector('.page-header');
const tripControls = pageHeader.querySelector('.trip-controls__filters');

const pageMain = document.querySelector('.page-main');
const tripEvents = pageMain.querySelector('.trip-events');

render(new NewFilterView(), tripControls);
render(new NewSortView(), tripEvents);
