class RequestApi {
  constructor({ store, headers }) {
    this.store = store;
    this.headers = headers || {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  fetch = ({ url, onSuccess, onFailure, headers }) =>
    fetch(url, {
      method: 'GET',
      headers: this.headers || headers,
    })
      .then(async response => {
        if (!response.ok) throw new Error(response.statusText);
        if (response.status === 204)
          return this.store.dispatch(onSuccess(null));
        const { data } = await response.json();
        this.store.dispatch(onSuccess(data));
      })
      .catch(error => this.store.dispatch(onFailure(error.message)));

  create = ({ url, onSuccess, onFailure, headers, values }) =>
    fetch(url, {
      method: 'POST',
      headers: this.headers || headers,
      body: JSON.stringify(values),
    })
      .then(async response => {
        if (!response.ok) throw new Error(response.statusText);
        if (response.status === 204)
          return this.store.dispatch(onSuccess(null));
        const { data } = await response.json();
        this.store.dispatch(onSuccess(data));
      })
      .catch(error => this.store.dispatch(onFailure(error.message)));
}

export default RequestApi;
