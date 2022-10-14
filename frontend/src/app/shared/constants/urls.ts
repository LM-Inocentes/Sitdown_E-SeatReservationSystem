const BASE_URL = 'http://localhost:5000';



export const USER_LOGIN_URL = BASE_URL + '/api/users/login';

export const USER_REGISTER_URL = BASE_URL + '/api/users/register';

export const USER_GET_URL = BASE_URL + '/api/users/';

export const EVENTS_URL = BASE_URL + '/api/events-info';

export const CREATE_EVENTS_URL = EVENTS_URL + '/create-event';

export const UPDATE_EVENTS_URL = EVENTS_URL + '/totalseats/update';

export const DELETE_EVENTS_URL = EVENTS_URL + '/delete-event/';

export const CREATE_SEATS_URL = EVENTS_URL + '/seats';

export const DELETE_SEATS_URL = EVENTS_URL + '/seats/delete/';

export const UPDATE_SEATS_URL = CREATE_SEATS_URL + '/update';

export const ADMIN_APPROVE_SEATS_URL = CREATE_SEATS_URL + '/admin/approve';

export const ADMIN_REJECT_SEATS_URL = CREATE_SEATS_URL + '/admin/reject';

export const GET_SEATS_URL = CREATE_SEATS_URL + '/info/';

export const EVENTS_IMG_URL = CREATE_EVENTS_URL + '/img';

export const EVENTS_BY_SEARCH_URL = EVENTS_URL + '/search/';

export const EVENTS_ID_URL = EVENTS_URL + '/';

export const EVENTS_NAME_URL = EVENTS_URL + '/get/';

export const RESERVATIONS_URL = BASE_URL + '/api/reservations/';

export const CREATE_RESERVATIONS_URL = RESERVATIONS_URL + 'createReservations';

export const RESERVATIONS_APPROVED_URL = BASE_URL + '/api/reservations/update/approve';

export const RESERVATIONS_REJECT_URL = BASE_URL + '/api/reservations/update/reject';

export const RESERVATIONS_DELETE_URL = BASE_URL + '/api/reservations/delete/';

