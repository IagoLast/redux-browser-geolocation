export const GEOLOCATION_FETCH_START = '@@geolocation/FETCH_START';
export const GEOLOCATION_FETCH_SUCCESS = '@@geolocation/FETCH_SUCCESS';
export const GEOLOCATION_FETCH_ERROR = '@@geolocation/FETCH_ERROR';


// ACTION CREATORS

export const getUserPosition = (options) => {
  return {
    type: GEOLOCATION_FETCH_START,
    payload: options,
  };
};

const locationSuccess = position => {
  return {
    type: GEOLOCATION_FETCH_SUCCESS,
    payload: position, // this object is not shown in the redux inspector!
  };
};

const locationError = error => {
  return {
    type: GEOLOCATION_FETCH_ERROR,
    payload: error,
    error: true,
  };
};

/**
 * Middleware
 */
export default ({dispatch}) => next => action => {
  switch (action.type) {
    case GEOLOCATION_FETCH_START:
      getLocation(dispatch, action.payload);
      break;
    default:
      break;
  }
  return next(action);
};



function getLocation(dispatch, options) {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      position => dispatch(locationSuccess(position)),
      error => dispatch(locationError(error)), options);
  } else {
    dispatch(locationError('The browser does not support geolocation'));
  }
}



