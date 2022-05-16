import { generatePoint } from '../mock/point-mock';

export default class PointModel {
  #points = Array.from( { length: 5 }, generatePoint);

  get points() {
    return this.#points;
  }
}
