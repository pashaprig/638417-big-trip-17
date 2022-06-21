// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import minMax from 'dayjs/plugin/minMax';
import duration from 'dayjs/plugin/duration';
import { FilterType } from './consts';
dayjs.extend(utc);
dayjs.extend(minMax);
dayjs.extend(duration);

export const humanizeFormEditTime = (dueDate) => dayjs(dueDate).format('DD/MM/YY HH:mm');
export const humanizePointDueDate = (dueDate) => dayjs(dueDate).format('MMM D');
export const humanizePointDueTime = (dueDate) => dayjs(dueDate).format('HH:mm');

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArrayElement = (elements) => (elements[getRandomInteger(0, elements.length - 1)]);

export const getRandomMultipleArrayElement = (elements) => {
  const randomArrayNumber = getRandomInteger(1, elements.length - 1);
  for (let i = elements.length - 1; i > 0; i--) {
    const randomSort = Math.floor(Math.random() * (i + 1));
    [elements[i], elements[randomSort]] = [elements[randomSort], elements[i]];
  }
  const array = elements.slice(0, randomArrayNumber);
  return array;
};

export const getDurationDates = (dateFrom, dateTo) => {
  const diff = dayjs(dateTo).diff(dateFrom);
  const daysCount = dayjs.duration(diff).format('DD');
  const hoursCount = dayjs.duration(diff).format('HH');
  const minutesCount = dayjs.duration(diff).format('mm');

  if (daysCount > 0) {
    return `${daysCount}D ${hoursCount}H ${minutesCount}M`;
  }
  if (hoursCount > 0) {
    return `${hoursCount}H ${minutesCount}M`;
  } else {
    return `${minutesCount}M`;
  }
};

export const getTitle = (boardPoint) => {
  let pretextTitle = 'to';
  if (boardPoint.type.includes('sightseeing') || boardPoint.type.includes('restaurant')) {
    pretextTitle = 'in';
  }
  if (boardPoint.type.includes('check-in')) {
    pretextTitle = 'at';
  }
  return pretextTitle;
};

export const isEscapePressed = (evt) => (evt.key === 'Escape' || evt.key === 'Esc');

// Сравнение цены
export const comparePrice = (priceA, priceB) => {
  if (priceA > priceB) {
    return -1;
  }
  if (priceA < priceB) {
    return 1;
  }
  return 0;
};

//Функция сортировки по цене для передачи в метод sort
export const sortPointByPrice = (pointA, pointB) => comparePrice(pointA.basePrice, pointB.basePrice);

//Сравнение времени
export const compareTime = (timeA, timeB) => {
  if (timeA > timeB) {
    return 1;
  }
  if (timeA < timeB) {
    return -1;
  }
  return 0;
};

//Функция сортировки по времени для передачи в метод sort
export const sortByTime = (pointA, pointB) => {
  const timeA = dayjs(pointA.dateFrom).diff(pointA.dateTo);
  const timeB = dayjs(pointB.dateFrom).diff(pointB.dateTo);
  return compareTime(timeA, timeB);
};

const getWeightForStartDate = (dateA, dateB) => dateA - dateB;

export const sortDayUp = (pointA, pointB) => getWeightForStartDate(dayjs(pointA.dateFrom), dayjs(pointB.dateFrom));

const isPointInPast = (dueDate) => dayjs().isAfter(dueDate, 'D');
const isPointInFuture = (dueDate) => dayjs().isBefore(dueDate, 'D');
const isPointInPresent = (dueDate) => dayjs().isSame(dueDate, 'D');
export const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');

export const filter = {
  [FilterType.ALL]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointInFuture(point.dateFrom) && isPointInPresent(point.dateFrom)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointInPast(point.dateTo)),
};

export const capitalise = (word) => word.slice(0, 1).toUpperCase() + word.slice(1);
