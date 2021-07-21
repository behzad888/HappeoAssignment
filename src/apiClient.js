import axios from 'axios';
import batchInterceptor from './interceptor';

const client = (userConfig = {}) => {
  const config = {
    baseURL: 'https://europe-west1-quickstart-1573558070219.cloudfunctions.net',
    headers: {},
    ...userConfig,
  };

  const instance = axios.create(config);
  batchInterceptor(instance);
  return instance;
};

export default client;
