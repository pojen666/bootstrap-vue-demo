import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
  });
instance.defaults.headers.get['Accept'] = 'application/json';

export default instance;