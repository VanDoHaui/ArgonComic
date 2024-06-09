import axios from 'axios';
import error from '../Errors';

const DEFAULT_TIMEOUT = 30000;

export const apiUrl = 'https://app-truyen.123code.net';
export const prefix = '/api/v1';

export const api = axios.create({
  baseURL: apiUrl + prefix,
  headers: {
    'Access-Control-Allow-Origin': '*',
    client_id: 2,
    client_secret: 'sJCnGaNoK0YToIKrUHqy3O6O3wiwaSGTDv3c6cxW',
  },
  timeout: DEFAULT_TIMEOUT,
});

export const setTokenAuthorization = _token => {
  api.defaults.headers.common.Authorization = _token ? `Bearer ${_token}` : '';
};

export const setContentTypeHeaders = value => {
  api.defaults.headers.common.Accept = value ? value : 'application/json';
  api.defaults.headers.common['Content-Type'] = value
    ? value
    : 'application/json';
};

export const setHeaders = (key, value) => {
  api.defaults.headers[key] = value;
};

//GET
export const GET = (url, config) => {
  config = {
    ...config,
    params: {...config.params},
  };
  cleanKeyNull(config.params);

  const request = api
    .get(url, config)
    .then(_handleResponse)
    .catch(_handleError);
  return request;
};

//POST
export const POST = (url, body, config) => {
  config = {
    ...config,
    params: {...config.params},
  };
  cleanKeyNull(config.params);

  const request = api
    .post(url, body, config)
    .then(_handleResponse)
    .catch(_handleError);
  return request;
};

//PUT
export const PUT = (url, body, config) => {
  config = {
    params: {...config.params},
  };
  cleanKeyNull(config.params);

  const request = api
    .put(url, body, config)
    .then(_handleResponse)
    .catch(_handleError);
  return request;
};

// PATCH
export const PATH = (url, body, config) => {
  config = {
    params: {...config.params},
  };
  cleanKeyNull(config.params);

  const request = api
    .patch(url, body, config)
    .then(_handleResponse)
    .catch(_handleError);
  return request;
};

// DELETE
export const DELETE = (url, config) => {
  config = {
    ...config,
    params: {...config.params},
  };
  cleanKeyNull(config.params);

  const request = api
    .delete(url, config)
    .then(_handleResponse)
    .catch(_handleError);
  return request;
};

//handling error
const _handleError = response => {
  if (
    response.status === 'fail' ||
    response.status === 'fail_validate' ||
    response.status === 'error'
  ) {
    return Promise.reject({
      ...error.client.getErrorMessage(response),
      error: true,
    });
  }

  // server error
  if (response.status >= 500) {
    return Promise.reject({
      ...error.server.getDefaultMessage(response),
      error: true,
    });
  }

  if (response.status >= 400 && response.status < 500) {
    return Promise.reject({
      ...error.client.getErrorMessage(response),
      error: true,
    });
  }

  if (!response.data) {
    return Promise.reject({
      ...error.network.getErrorMessage(response),
      type: 'network',
      error: true,
    });
  }

  return Promise.reject({message: 'UNKNOWN_ERROR', error: true});
};

//handling response
const _handleResponse = response => {
  const data = response.data;
  // response not ok so reject and it will go to catch function in promise
  if (data.status !== 'success') {
    return Promise.reject({...data, error: true});
  }

  // response data
  return data;
};

const cleanKeyNull = obj => {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
};
