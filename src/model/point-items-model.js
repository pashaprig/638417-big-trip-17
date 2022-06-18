import { generatePoint } from '../mock/point-mock';
import Observable from '../framework/observable.js';

export default class PointModel extends Observable {
  #points = Array.from( { length: 4 }, generatePoint); // { length: 0 } отрисует заглушку

  get points() {
    return this.#points;
  }
}
