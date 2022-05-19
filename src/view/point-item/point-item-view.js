import AbstractView from '../../framework/view/abstract-view.js';
import createPointTemplate from './point-item-tpl';

export default class PointItemView extends AbstractView {
  #boardPoint = null;

  constructor(boardPoint) {
    super();
    this.#boardPoint = boardPoint;
  }

  get template() {
    return createPointTemplate(this.#boardPoint);
  }
}
