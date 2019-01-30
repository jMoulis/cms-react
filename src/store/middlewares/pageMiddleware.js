import {
  FETCH_PAGES,
  fetchPagesSuccess,
  fetchPagesFailure,
  CREATE_PAGE,
  createPageSuccess,
  createPageFailure,
} from 'store/reducers/pageReducer';
import RequestApi from './RequestApi';

const ROOT_API = process.env.REACT_APP_API;

// const request = ({ url, store, onSuccess, onFailure, method }) =>
//   fetch(url, {
//     method: method || 'GET',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//   })
//     .then(async response => {
//       if (!response.ok) throw new Error(response.statusText);
//       if (response.status === 204) return store.dispatch(onSuccess(null));
//       const { data } = await response.json();
//       store.dispatch(onSuccess(data));
//     })
//     .catch(error => store.dispatch(onFailure(error.message)));

export default store => next => async action => {
  const request = new RequestApi({ store });

  switch (action.type) {
    case FETCH_PAGES: {
      request.fetch({
        url: `${ROOT_API}/api/pages`,
        store,
        onSuccess: fetchPagesSuccess,
        onFailure: fetchPagesFailure,
      });
      break;
    }
    case CREATE_PAGE: {
      const { values } = action;
      request.create({
        url: `${ROOT_API}/api/pages`,
        method: 'POST',
        onSuccess: createPageSuccess,
        onFailure: createPageFailure,
        values,
      });
      break;
    }
    default:
  }

  next(action);
};
