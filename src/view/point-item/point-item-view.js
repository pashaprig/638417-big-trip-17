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

  setPointButtonOpenHandler = (callback) => {
    this._callback.buttonOpen = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#pointButtonOpenHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  };

  #pointButtonOpenHandler = () => {
    this._callback.buttonOpen();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}
