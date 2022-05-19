import AbstractView from '../../framework/view/abstract-view.js';
import createPointListEmptyTemplate from './point-list-empty-tpl.js';

export default class PiontListEmptyView extends AbstractView {
  get template() {
    return createPointListEmptyTemplate();
  }
}
