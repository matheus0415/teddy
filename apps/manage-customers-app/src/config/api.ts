import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://boasorte.teddybackoffice.com.br',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
