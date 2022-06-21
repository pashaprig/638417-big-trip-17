import AbstractView from '../../framework/view/abstract-view.js';
import createNewFilterTemplate from './filter-tpl.js';

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createNewFilterTemplate(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    if (!evt.target.classList.contains('trip-filters__filter-label')) {
      return;
    }
    this._callback.filterTypeChange(evt.target.parentNode.querySelector('.trip-filters__filter-input').value);
  };
}
