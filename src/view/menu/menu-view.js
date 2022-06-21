import AbstractView from '../../framework/view/abstract-view';
import createNewMenuTemplate from './menu-tpl';

export default class MenuView extends AbstractView {
  get template() {
    return createNewMenuTemplate();
  }
}
