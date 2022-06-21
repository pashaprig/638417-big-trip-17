import {allOffers} from './offer-mock';
import {createDestinations} from './destination-mock';
import {getRandomInteger, getRandomArrayElement} from '../utils';
import { nanoid } from 'nanoid';
import { CITIES_LIBRARY, TYPES_LIBRARY } from '../consts';

export const generatePoint = () => {
  const pointType = getRandomArrayElement(TYPES_LIBRARY);
  const offers = allOffers.find((offer) => offer.type === pointType);

  const cityName = getRandomArrayElement(CITIES_LIBRARY);
  const allDestination = createDestinations();
  const destinationInfo = allDestination.find((destination) => destination.name === cityName);

  return {
    id: nanoid(),
    basePrice: getRandomInteger(10, 1000),
    dateFrom: `2022-06-${getRandomInteger(10, 17)}T0${getRandomInteger(1, 3)}:16:54.401Z`,
    dateTo: `2022-06-${getRandomInteger(17, 20)}T03:${getRandomInteger(17, 55)}:54.401Z`,
    isFavorite: Boolean(getRandomInteger(0, 1)),
    destination: destinationInfo.name,
    description: destinationInfo.description,
    pictures: destinationInfo.pictures,
    offers: offers.offers,
    type: offers.type,
  };
};
