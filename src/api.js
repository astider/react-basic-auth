import fetch from 'isomorphic-unfetch';

const baseURL = 'http://localhost:8888';

const processFetch = (res) => (
  Promise.all([res.ok, res.json()])
    .then(([ok, response]) => {
      if (!ok) {
        return Promise.reject(response);
      }
      return Promise.resolve({ data: response });
    })
);

export default {
  get: (url) => (
    fetch(`${baseURL}${url}`, {
      method: 'GET',
      headers: {
        ...typeof window !== 'undefined' && window?.localStorage.getItem('access-token')
          ? { Authorization: `Bearer ${window.localStorage.getItem('access-token')}` }
          : {},
      },
    }).then(processFetch)
  ),
  post: (url, body = {}) => (
    fetch(`${baseURL}${url}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(processFetch)
  ),
};
