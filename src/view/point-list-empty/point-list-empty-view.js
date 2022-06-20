import AbstractView from '../../framework/view/abstract-view';
import createPointListEmptyTemplate from './point-list-empty-tpl';

export default class PiontListEmptyView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createPointListEmptyTemplate(this.#filterType);
  }
}
