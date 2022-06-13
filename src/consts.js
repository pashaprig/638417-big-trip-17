const FilterType = {
  ALL: 'all',
  FUTURE : 'future',
  PAST: 'past',
};

const SortType = {
  DEFAULT: 'default',
  PRICE: 'price',
  TIME: 'time',
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const DEFAULT_POINT = {
  type: '',
  destination: null,
  basePrice: '',
  dateFrom: '',
  dateTo: '',
  id: '',
  offers: [],
};

const sortEnum = {
  day:'sort-day',
  time:'sort-time',
  price:'sort-price',
};

const TYPES_LIBRARY = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const CITIES_LIBRARY = ['Chamonix', 'Geneva', 'Amsterdam', 'Helsinki', 'Kyiv'];

export {FilterType, SortType, Mode, TYPES_LIBRARY, DEFAULT_POINT, sortEnum, CITIES_LIBRARY};
