import { CITIES_LIBRARY, TYPES_LIBRARY } from '../../consts';
import { capitalise, getTitle } from '../../utils';

const getOffers = (checkedType, offers/*, checkedOffers*/) => {
  const pointTypeOffer = offers.find((offer) => offer.type === checkedType);

  let offersTemplate = '';
  pointTypeOffer.offers.forEach((offer) => {
    // const checked = checkedOffers.includes(offer.id) ? 'checked' : '';
    offersTemplate += `
    <div class="event__offer-selector">
     <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-${offer.id}" type="checkbox" name="event-offer-${offer.title}" checked>
     <label class="event__offer-label" for="event-offer-${offer.title}-${offer.id}">
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
  trip.forEach((pictures) => {picturesTemplate += `<img class="event__photo" src=${pictures.src} alt="${pictures.description}">`;});
  return picturesTemplate;
};

const createNewEditFormTemplate = (point, offers) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    type,
    id,
    checkedType,
    description,
    pictures
  } = point;

  return (
    ` <li class="trip-events__item">
       <form class="event event--edit" action="#" method="post">
         <header class="event__header">
           <div class="event__type-wrapper">
             <label class="event__type  event__type-btn" for="event-type-toggle-1">
               <span class="visually-hidden">Choose event type</span>
               <img class="event__type-icon" width="17" height="17" src="img/icons/${checkedType ? checkedType : type}.png" alt="Event type icon">
             </label>
             <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
             <div class="event__type-list">
               <fieldset class="event__type-group">
                 <legend class="visually-hidden">Event type</legend>

                 ${TYPES_LIBRARY.map((eventType) => (
      `<div class="event__type-item">
                    <input id="event-type-${eventType}-${id}"
                           class="event__type-input  visually-hidden" type="radio" name="event-type"
                           value="${eventType}"
                           ${eventType === type && 'checked'}>
                    <label class="event__type-label  event__type-label--${eventType}"
                           for="event-type-${eventType}-${id}">${capitalise(eventType)}</label>
                  </div>`)).join('')}

                 <div class="event__type-item">
                   <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                   <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                 </div>

               </fieldset>
             </div>
           </div>
           <div class="event__field-group  event__field-group--destination">
             <label class="event__label  event__type-output" for="event-destination-1">
               ${checkedType ? checkedType : type} ${getTitle(point)}
             </label>
             <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${destination} list="destination-list-1">
             <datalist id="destination-list-1">
              ${CITIES_LIBRARY.map((city) => (`<option value=${city}></option>`)).join('')}
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
                 ${getOffers(checkedType, offers)}
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
     </li>`
  );
};

export default createNewEditFormTemplate;
