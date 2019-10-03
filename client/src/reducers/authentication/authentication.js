import { combineReducers } from 'redux';

const authenticated = (state = false, action) => {
  switch (action.type) {
    case 'SET_AUTHENTICATED':
      return action.boolean;
    default:
      return state
  }
}

export default combineReducers({ authenticated });
