import AbstractView from '../../framework/view/abstract-view.js';
import createNewFilterTemplate from './filter-tpl.js';

export default class FilterView extends AbstractView {
  get template() {
    return createNewFilterTemplate();
  }
}
