import { sotrEnum } from '../../consts.js';
import AbstractView from '../../framework/view/abstract-view.js';
import createSortTemplate from './sort-tpl.js';

export default class SortView extends AbstractView {
  get template() {
    return createSortTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    const attributeTarget = evt.target.getAttribute('for');
    if (attributeTarget === sotrEnum.day || attributeTarget === sotrEnum.time || attributeTarget === sotrEnum.price) {
      this.element.querySelector(`#${attributeTarget}`).checked = true;
    }
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
