import axios from 'axios';

export const controller = new AbortController();
export const api = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '29586318-be42348f9d86dafd6196efc0c',
    signal: controller.signal,
  },
});
