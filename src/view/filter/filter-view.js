import AbstractView from '../../framework/view/abstract-view.js';
import createNewFilterTemplate from './filter-tpl.js';

export default class FilterView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createNewFilterTemplate(this.#filters);
  }
}
