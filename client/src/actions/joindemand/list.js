import {
  fetch,
  normalize,
  extractHubURL,
  mercureSubscribe as subscribe
} from '../../services/dataAccess';
import { success as deleteSuccess } from './delete';

export function error(error) {
  return { type: 'JOINDEMAND_LIST_ERROR', error };
}

export function loading(loading) {
  return { type: 'JOINDEMAND_LIST_LOADING', loading };
}

export function success(retrieved) {
  return { type: 'JOINDEMAND_LIST_SUCCESS', retrieved };
}

export function list(page = '/join_demands') {
  return dispatch => {
    dispatch(loading(true));
    dispatch(error(''));

    fetch(page)
      .then(response =>
        response
          .json()
          .then(retrieved => ({ retrieved, hubURL: extractHubURL(response) }))
      )
      .then(({ retrieved, hubURL }) => {
        retrieved = normalize(retrieved);

        dispatch(loading(false));
        dispatch(success(retrieved));

        if (hubURL)
          dispatch(
            mercureSubscribe(
              hubURL,
              retrieved['hydra:member'].map(i => i['@id'])
            )
          );
      })
      .catch(e => {
        dispatch(loading(false));
        dispatch(error(e.message));
      });
  };
}

export function reset(eventSource) {
  return dispatch => {
    if (eventSource) eventSource.close();

    dispatch({ type: 'JOINDEMAND_LIST_RESET' });
    dispatch(deleteSuccess(null));
  };
}

export function mercureSubscribe(hubURL, topics) {
  return dispatch => {
    const eventSource = subscribe(hubURL, topics);
    dispatch(mercureOpen(eventSource));
    eventSource.addEventListener('message', event =>
      dispatch(mercureMessage(normalize(JSON.parse(event.data))))
    );
  };
}

export function mercureOpen(eventSource) {
  return { type: 'JOINDEMAND_LIST_MERCURE_OPEN', eventSource };
}

export function mercureMessage(retrieved) {
  return dispatch => {
    if (1 === Object.keys(retrieved).length) {
      dispatch({ type: 'JOINDEMAND_LIST_MERCURE_DELETED', retrieved });
      return;
    }

    dispatch({ type: 'JOINDEMAND_LIST_MERCURE_MESSAGE', retrieved });
  };
}
