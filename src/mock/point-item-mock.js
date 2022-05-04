import { getRandomInteger } from '../utils.js';

const generateType = () => {
  const types = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

  const randomIndex = getRandomInteger(0, types.length - 1);

  return types[randomIndex];
};

export const generatePoint = () => ({
  basePrice: 1100,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: '$Destination$',
  id: '0',
  isFavorite: false,
  offers: '$Array < Offer > $',
  type: generateType(),
});

console.log('point-item-mock', generatePoint());
