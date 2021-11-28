import axios from 'axios'

const baseURL = 'http://localhost:8000/'

const Axios = axios.create({
    baseURL: baseURL
})

Axios.defaults.withCredentials = true

Axios.interceptors.request.use(function (config) {
    let token = window.localStorage.getItem('token')
    if (token !== null) {
        config.headers['Token'] = token
    }

    return config;
  }, function (error) {
    return Promise.reject(error);
});

export default Axios
