import axios from 'axios'

const baseURL = 'http://localhost:8000/'

const Axios = axios.create({
    baseURL: baseURL
})

Axios.interceptors.request.use(function (config) {
    let token = window.localStorage.getItem('token')
    if (token !== null) {
        config.headers['Token'] = token
    }

    return config;
  }, function (error) {
    return Promise.reject(error);
});

export function check_auth(callback_true, callback_false) {
    Axios.get('account/whoami/').then(res => {
        if (res.status === 200) {
            callback_true()
        } else {
            callback_false()
        }
    }).catch(error => { callback_false() })
}

export default Axios
