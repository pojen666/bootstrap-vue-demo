import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://a3b93ec9-c7f2-4296-af24-5e1b010d4473.mock.pstmn.io',
  });
instance.defaults.headers.get['Accept'] = 'application/json';

export default instance;