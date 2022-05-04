import { generatePoint } from '../mock/point-item-mock';

export default class PointModel {
  points = Array.from({ lenth: 3 }, generatePoint);

  getPoints = () => this.points;
}

console.log('point-items-model', new PointModel);
