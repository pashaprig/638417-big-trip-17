import AbstractView from '../../framework/view/abstract-view.js';
import createPointListTemplate from './point-list-tpl.js';

export default class PiontListView extends AbstractView {
  get template() {
    return createPointListTemplate();
  }
}
