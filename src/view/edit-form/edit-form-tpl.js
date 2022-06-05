import { getTitle } from '../../utils';

const getOffers = (trip) => {
  let offersTemplate = '';
  trip.forEach((offer) =>{
    offersTemplate += `
    <div class="event__offer-selector">
     <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-1" type="checkbox" name="event-offer-${offer.title}" checked>
     <label class="event__offer-label" for="event-offer-${offer.title}-1">
       <span class="event__offer-title">${offer.title}</span>
       &plus;&euro;&nbsp;
       <span class="event__offer-price">${offer.price}</span>
     </label>
    </div>`;
  });
  return offersTemplate;
};

const getPicture = (trip) => {
  let picturesTemplate = '';
  trip.forEach((pictures) => {
    const {photo} = pictures;
    picturesTemplate += `
    <img class="event__photo" src=${photo} alt="Event photo">
    `;
  });
  return picturesTemplate;
};

const createNewEditFormTemplate = (point, boardDestination) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    offers,
    type
  } = point;

  const {
    description,
    pictures
  } = boardDestination;

  return (
    ` <li class="trip-events__item">
       <form class="event event--edit" action="#" method="post">
         <header class="event__header">
           <div class="event__type-wrapper">
             <label class="event__type  event__type-btn" for="event-type-toggle-1">
               <span class="visually-hidden">Choose event type</span>
               <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
             </label>
             <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
             <div class="event__type-list">
               <fieldset class="event__type-group">
                 <legend class="visually-hidden">Event type</legend>
                 <div class="event__type-item">
                   <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                   <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                 </div>
                 <div class="event__type-item">
                   <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                   <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                 </div>
                 <div class="event__type-item">
                   <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                   <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                 </div>
                 <div class="event__type-item">
                   <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                   <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                 </div>
                 <div class="event__type-item">
                   <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                   <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                 </div>
                 <div class="event__type-item">
                   <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                   <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                 </div>
                 <div class="event__type-item">
                   <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                   <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                 </div>
                 <div class="event__type-item">
                   <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                   <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                 </div>
                 <div class="event__type-item">
                   <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                   <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                 </div>
               </fieldset>
             </div>
           </div>
           <div class="event__field-group  event__field-group--destination">
             <label class="event__label  event__type-output" for="event-destination-1">
               ${type} ${getTitle(point)}
             </label>
             <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${destination} list="destination-list-1">
             <datalist id="destination-list-1">
               <option value="Amsterdam"></option>
               <option value="Geneva"></option>
               <option value="Chamonix"></option>
             </datalist>
           </div>
           <div class="event__field-group  event__field-group--time">
             <label class="visually-hidden" for="event-start-time-1">From</label>
             <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom.format('YY/MM/DD HH:mm')}">
             &mdash;
             <label class="visually-hidden" for="event-end-time-1">To</label>
             <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo.format('YY/MM/DD HH:mm')}">
           </div>
           <div class="event__field-group  event__field-group--price">
             <label class="event__label" for="event-price-1">
               <span class="visually-hidden">Price</span>
               &euro;
             </label>
             <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice}>
           </div>
           <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
           <button class="event__reset-btn" type="reset">Delete</button>
           <button class="event__rollup-btn" type="button">
             <span class="visually-hidden">Open event</span>
           </button>
         </header>
         <section class="event__details">
           <section class="event__section  event__section--offers">
             <h3 class="event__section-title  event__section-title--offers">Offers</h3>
             <div class="event__available-offers">
                 ${getOffers(offers)}
             </div>
           </section>
           <section class="event__section  event__section--destination">
             <h3 class="event__section-title  event__section-title--destination">Destination</h3>
             <p class="event__destination-description">${description}</p>
             <div class="event__photos-container">
               <div class="event__photos-tape">
                  ${getPicture(pictures)}
                </div>
             </div>
           </section>
         </section>
       </form>
     </li>
     <li class="trip-events__item">
       <div class="event">
         <time class="event__date" datetime="2019-03-18">MAR 18</time>
         <div class="event__type">
           <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
         </div>
         <h3 class="event__title">Taxi Amsterdam</h3>
         <div class="event__schedule">
           <p class="event__time">
             <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
             &mdash;
             <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
           </p>
           <p class="event__duration">30M</p>
         </div>
         <p class="event__price">
           &euro;&nbsp;<span class="event__price-value">20</span>
         </p>
         <h4 class="visually-hidden">Offers:</h4>
         <ul class="event__selected-offers">
           <li class="event__offer">
             <span class="event__offer-title">Order Uber</span>
             &plus;&euro;&nbsp;
             <span class="event__offer-price">20</span>
           </li>
         </ul>
         <button class="event__favorite-btn event__favorite-btn--active" type="button">
           <span class="visually-hidden">Add to favorite</span>
           <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
             <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
           </svg>
         </button>
         <button class="event__rollup-btn" type="button">
           <span class="visually-hidden">Open event</span>
         </button>
       </div>
     </li>
     <li class="trip-events__item">
       <div class="event">
         <time class="event__date" datetime="2019-03-18">MAR 18</time>
         <div class="event__type">
           <img class="event__type-icon" width="42" height="42" src="img/icons/flight.png" alt="Event type icon">
         </div>
         <h3 class="event__title">Flight Chamonix</h3>
         <div class="event__schedule">
           <p class="event__time">
             <time class="event__start-time" datetime="2019-03-18T12:25">12:25</time>
             &mdash;
             <time class="event__end-time" datetime="2019-03-18T13:35">13:35</time>
           </p>
           <p class="event__duration">01H 10M</p>
         </div>
         <p class="event__price">
           &euro;&nbsp;<span class="event__price-value">160</span>
         </p>
         <h4 class="visually-hidden">Offers:</h4>
         <ul class="event__selected-offers">
           <li class="event__offer">
             <span class="event__offer-title">Add luggage</span>
             &plus;&euro;&nbsp;
             <span class="event__offer-price">50</span>
           </li>
           <li class="event__offer">
             <span class="event__offer-title">Switch to comfort</span>
             &plus;&euro;&nbsp;
             <span class="event__offer-price">80</span>
           </li>
         </ul>
         <button class="event__favorite-btn" type="button">
           <span class="visually-hidden">Add to favorite</span>
           <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
             <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
           </svg>
         </button>
         <button class="event__rollup-btn" type="button">
           <span class="visually-hidden">Open event</span>
         </button>
       </div>
     </li>
     <li class="trip-events__item">
       <div class="event">
         <time class="event__date" datetime="2019-03-18">MAR 18</time>
         <div class="event__type">
           <img class="event__type-icon" width="42" height="42" src="img/icons/drive.png" alt="Event type icon">
         </div>
         <h3 class="event__title">Drive Chamonix</h3>
         <div class="event__schedule">
           <p class="event__time">
             <time class="event__start-time" datetime="2019-03-18T14:30">14:30</time>
             &mdash;
             <time class="event__end-time" datetime="2019-03-18T16:05">16:05</time>
           </p>
           <p class="event__duration">01H 35M</p>
         </div>
         <p class="event__price">
           &euro;&nbsp;<span class="event__price-value">160</span>
         </p>
         <h4 class="visually-hidden">Offers:</h4>
         <ul class="event__selected-offers">
           <li class="event__offer">
             <span class="event__offer-title">Rent a car</span>
             &plus;&euro;&nbsp;
             <span class="event__offer-price">200</span>
           </li>
         </ul>
         <button class="event__favorite-btn  event__favorite-btn--active" type="button">
           <span class="visually-hidden">Add to favorite</span>
           <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
             <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
           </svg>
         </button>
         <button class="event__rollup-btn" type="button">
           <span class="visually-hidden">Open event</span>
         </button>
       </div>
     </li>
     <li class="trip-events__item">
       <div class="event">
         <time class="event__date" datetime="2019-03-18">MAR 18</time>
         <div class="event__type">
           <img class="event__type-icon" width="42" height="42" src="img/icons/check-in.png" alt="Event type icon">
         </div>
         <h3 class="event__title">Check-in Chamonix</h3>
         <div class="event__schedule">
           <p class="event__time">
             <time class="event__start-time" datetime="2019-03-18T12:25">16:20</time>
             &mdash;
             <time class="event__end-time" datetime="2019-03-18T13:35">17:00</time>
           </p>
           <p class="event__duration">40M</p>
         </div>
         <p class="event__price">
           &euro;&nbsp;<span class="event__price-value">600</span>
         </p>
         <h4 class="visually-hidden">Offers:</h4>
         <ul class="event__selected-offers">
           <li class="event__offer">
             <span class="event__offer-title">Add breakfast</span>
             &plus;&euro;&nbsp;
             <span class="event__offer-price">50</span>
           </li>
         </ul>
         <button class="event__favorite-btn event__favorite-btn--active" type="button">
           <span class="visually-hidden">Add to favorite</span>
           <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
             <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
           </svg>
         </button>
         <button class="event__rollup-btn" type="button">
           <span class="visually-hidden">Open event</span>
         </button>
       </div>
     </li>
     <li class="trip-events__item">
       <div class="event">
         <time class="event__date" datetime="2019-03-19">MAR 19</time>
         <div class="event__type">
           <img class="event__type-icon" width="42" height="42" src="img/icons/sightseeing.png" alt="Event type icon">
         </div>
         <h3 class="event__title">Sightseeing Chamonix</h3>
         <div class="event__schedule">
           <p class="event__time">
             <time class="event__start-time" datetime="2019-03-19T11:20">14:20</time>
             &mdash;
             <time class="event__end-time" datetime="2019-03-19T13:00">13:00</time>
           </p>
           <p class="event__duration">01H 20M</p>
         </div>
         <p class="event__price">
           &euro;&nbsp;<span class="event__price-value">50</span>
         </p>
         <h4 class="visually-hidden">Offers:</h4>
         <ul class="event__selected-offers">
           <li class="event__offer">
             <span class="event__offer-title">Book tickets</span>
             &plus;&euro;&nbsp;
             <span class="event__offer-price">40</span>
           </li>
           <li class="event__offer">
             <span class="event__offer-title">Lunch in city</span>
             &plus;&euro;&nbsp;
             <span class="event__offer-price">30</span>
           </li>
         </ul>
         <button class="event__favorite-btn" type="button">
           <span class="visually-hidden">Add to favorite</span>
           <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
             <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
           </svg>
         </button>
         <button class="event__rollup-btn" type="button">
           <span class="visually-hidden">Open event</span>
         </button>
       </div>
     </li>
     <li class="trip-events__item">
       <div class="event">
         <time class="event__date" datetime="2019-03-19">MAR 19</time>
         <div class="event__type">
           <img class="event__type-icon" width="42" height="42" src="img/icons/drive.png" alt="Event type icon">
         </div>
         <h3 class="event__title">Drive Geneva</h3>
         <div class="event__schedule">
           <p class="event__time">
             <time class="event__start-time" datetime="2019-03-19T10:00">16:00</time>
             &mdash;
             <time class="event__end-time" datetime="2019-03-19T11:00">17:00</time>
           </p>
           <p class="event__duration">01H</p>
         </div>
         <p class="event__price">
           &euro;&nbsp;<span class="event__price-value">20</span>
         </p>
         <button class="event__favorite-btn" type="button">
           <span class="visually-hidden">Add to favorite</span>
           <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
             <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
           </svg>
         </button>
         <button class="event__rollup-btn" type="button">
           <span class="visually-hidden">Open event</span>
         </button>
       </div>
     </li>
     <li class="trip-events__item">
       <div class="event">
         <time class="event__date" datetime="2019-03-19">MAR 19</time>
         <div class="event__type">
           <img class="event__type-icon" width="42" height="42" src="img/icons/flight.png" alt="Event type icon">
         </div>
         <h3 class="event__title">Flight Geneva</h3>
         <div class="event__schedule">
           <p class="event__time">
             <time class="event__start-time" datetime="2019-03-19T18:00">18:00</time>
             &mdash;
             <time class="event__end-time" datetime="2019-03-19T19:00">19:00</time>
           </p>
           <p class="event__duration">01H</p>
         </div>
         <p class="event__price">
           &euro;&nbsp;<span class="event__price-value">20</span>
         </p>
         <h4 class="visually-hidden">Offers:</h4>
         <ul class="event__selected-offers">
           <li class="event__offer">
             <span class="event__offer-title">Add luggage</span>
             &plus;&euro;&nbsp;
             <span class="event__offer-price">30</span>
           </li>
           <li class="event__offer">
             <span class="event__offer-title">Switch to comfort</span>
             &plus;&euro;&nbsp;
             <span class="event__offer-price">100</span>
           </li>
         </ul>
         <button class="event__favorite-btn" type="button">
           <span class="visually-hidden">Add to favorite</span>
           <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
             <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
           </svg>
         </button>
         <button class="event__rollup-btn" type="button">
           <span class="visually-hidden">Open event</span>
         </button>
       </div>
     </li>
     <li class="trip-events__item">
       <div class="event">
         <time class="event__date" datetime="2019-03-20">MAR 20</time>
         <div class="event__type">
           <img class="event__type-icon" width="42" height="42" src="img/icons/drive.png" alt="Event type icon">
         </div>
         <h3 class="event__title">Drive Geneva</h3>
         <div class="event__schedule">
           <p class="event__time">
             <time class="event__start-time" datetime="2019-03-20T08:25">08:25</time>
             &mdash;
             <time class="event__end-time" datetime="2019-03-20T09:25">09:25</time>
           </p>
           <p class="event__duration">01H</p>
         </div>
         <p class="event__price">
           &euro;&nbsp;<span class="event__price-value">20</span>
         </p>
         <button class="event__favorite-btn" type="button">
           <span class="visually-hidden">Add to favorite</span>
           <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
             <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
           </svg>
         </button>
         <button class="event__rollup-btn" type="button">
           <span class="visually-hidden">Open event</span>
         </button>
       </div>
     </li>
     <li class="trip-events__item">
       <div class="event">
         <time class="event__date" datetime="2019-03-20">MAR 20</time>
         <div class="event__type">
           <img class="event__type-icon" width="42" height="42" src="img/icons/sightseeing.png" alt="Event type icon">
         </div>
         <h3 class="event__title">Sightseeing Geneva</h3>
         <div class="event__schedule">
           <p class="event__time">
             <time class="event__start-time" datetime="2019-03-20T11:15">11:15</time>
             &mdash;
             <time class="event__end-time" datetime="2019-03-20T12:15">12:15</time>
           </p>
           <p class="event__duration">01H</p>
         </div>
         <p class="event__price">
           &euro;&nbsp;<span class="event__price-value">180</span>
         </p>
         <button class="event__favorite-btn" type="button">
           <span class="visually-hidden">Add to favorite</span>
           <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
             <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
           </svg>
         </button>
         <button class="event__rollup-btn" type="button">
           <span class="visually-hidden">Open event</span>
         </button>
       </div>
     </li>`
  );
};

export default createNewEditFormTemplate;
