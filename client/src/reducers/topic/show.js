import { combineReducers } from 'redux';

export function error(state = null, action) {
  switch (action.type) {
    case 'DISCUSSION_SHOW_ERROR':
      return action.error;

    case 'DISCUSSION_SHOW_MERCURE_DELETED':
      return `${action.retrieved['@id']} has been deleted by another user.`;

    case 'DISCUSSION_SHOW_RESET':
      return null;

    default:
      return state;
  }
}

export function loading(state = false, action) {
  switch (action.type) {
    case 'DISCUSSION_SHOW_LOADING':
      return action.loading;

    case 'DISCUSSION_SHOW_RESET':
      return false;

    default:
      return state;
  }
}

export function retrieved(state = null, action) {
  switch (action.type) {
    case 'DISCUSSION_SHOW_SUCCESS':
    case 'DISCUSSION_SHOW_MERCURE_MESSAGE':
      return action.retrieved;

    case 'DISCUSSION_SHOW_RESET':
      return null;

    default:
      return state;
  }
}

export function eventSource(state = null, action) {
  switch (action.type) {
    case 'DISCUSSION_SHOW_MERCURE_OPEN':
      return action.eventSource;

    case 'DISCUSSION_SHOW_RESET':
      return null;

    default:
      return state;
  }
}

export default combineReducers({ error, loading, retrieved, eventSource });
