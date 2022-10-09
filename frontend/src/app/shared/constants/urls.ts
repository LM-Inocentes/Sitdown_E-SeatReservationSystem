const BASE_URL = 'http://localhost:5000';



export const USER_LOGIN_URL = BASE_URL + '/api/users/login';

export const EVENTS_URL = BASE_URL + '/api/events-info';

export const CREATE_EVENTS_URL = EVENTS_URL + '/create-event';

export const CREATE_SEATS_URL = EVENTS_URL + '/seats';

export const GET_SEATS_URL = CREATE_SEATS_URL + '/info/';

export const EVENTS_IMG_URL = CREATE_EVENTS_URL + '/img';

export const EVENTS_BY_SEARCH_URL = EVENTS_URL + '/search/';

export const EVENTS_ID_URL = EVENTS_URL + '/';

export const USER_REGISTER_URL = BASE_URL + '/api/users/register';