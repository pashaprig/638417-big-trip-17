import { createDestinations } from '../mock/destination-mock.js';


export default class DestinationModel {
  #destinations = createDestinations();

  get destinations() {
    return this.#destinations;
  }
}
