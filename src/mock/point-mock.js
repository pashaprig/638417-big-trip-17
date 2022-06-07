import {allOffers} from './offer-mock.js';
import {createDestinations} from './destination-mock.js';
import {getRandomInteger, getRandomArrayElement} from '../utils.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import minMax from 'dayjs/plugin/minMax.js';
import { nanoid } from 'nanoid';
import { TYPES_LIBRARY } from '../consts.js';
dayjs.extend(utc);
dayjs.extend(minMax);


const genearateDate = () => {
  const daysGap = 10;
  const firstDayGap = getRandomInteger(-daysGap, daysGap);
  const secondDayGap = getRandomInteger(firstDayGap, daysGap);
  return {
    dateFrom: dayjs.utc().add(firstDayGap, 'day').add(getRandomInteger(0, daysGap), 'minute').add(getRandomInteger(0, daysGap), 'hour'),
    dateTo: dayjs.utc().add(secondDayGap, 'day').add(getRandomInteger(0, daysGap), 'minute').add(getRandomInteger(0, daysGap), 'hour'),
  };
};

export const generatePoint = () => {
  const pointType = getRandomArrayElement(TYPES_LIBRARY);
  const offers = allOffers.find((offer) => offer.type === pointType);

  return {
    id: nanoid(),
    basePrice: getRandomInteger(10, 1000),
    dateFrom: dayjs.min(dayjs(), genearateDate().dateFrom, genearateDate().dateTo),
    dateTo: dayjs.max(dayjs(), genearateDate().dateFrom, genearateDate().dateTo),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    destination: getRandomArrayElement(createDestinations()).name,
    offers: offers.offers,
    type: offers.type,
  };
};
