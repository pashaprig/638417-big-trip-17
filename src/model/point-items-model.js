import { generatePoint } from '../mock/point-mock';

export default class PointModel {
  #points = Array.from( { length: 0 }, generatePoint);

  get points() {
    return this.#points;
  }
}
