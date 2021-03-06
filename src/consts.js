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

const TYPES_LIBRARY = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const CITIES_LIBRARY = ['Chamonix', 'Geneva', 'Amsterdam', 'Helsinki', 'Kyiv'];

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export {FilterType, SortType, Mode, TYPES_LIBRARY, CITIES_LIBRARY, UserAction, UpdateType};
