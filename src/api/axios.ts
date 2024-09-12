import axios from 'axios';

const $axios = axios.create({
  baseURL: 'https://reqres.in/api/',
});

export default $axios;
