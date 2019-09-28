import { SubmissionError } from 'redux-form';
import { fetch } from '../../services/dataAccess';
import { authentication } from '../../services/authentication';

export function error(error) {
  return { type: 'PROJECT_CREATE_ERROR', error };
}

export function loading(loading) {
  return { type: 'PROJECT_CREATE_LOADING', loading };
}

export function success(created) {
  return { type: 'PROJECT_CREATE_SUCCESS', created };
}

export function create(values) {

  values['description'] = document.getElementById('project_description').value;
  const categories = [];
  for (let [key] of Object.entries(values)) {
    if (key.startsWith('category')) {
      categories.push(key.replace('category-', ''));
    }
  }
  values.categories = categories;
  values.initiator = authentication.currentUserValue['@id'];
  const members = [];
  members.push(authentication.currentUserValue['@id']);
  values.members = members;

  return dispatch => {
    dispatch(loading(true));

    return fetch('/projects', { method: 'POST', body: JSON.stringify(values) })
      .then(response => {
        dispatch(loading(false));

        return response.json();
      })
      .then(retrieved => dispatch(success(retrieved)))
      .catch(e => {
        dispatch(loading(false));

        if (e instanceof SubmissionError) {
          dispatch(error(e.errors._error));
          throw e;
        }

        dispatch(error(e.message));
      });
  };
}

export function reset() {
  return dispatch => {
    dispatch(loading(false));
    dispatch(error(null));
  };
}
