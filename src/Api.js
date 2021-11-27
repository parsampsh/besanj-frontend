import axios from 'axios'

const baseURL = 'http://localhost:8000/'

Axios = axios.create({
    baseURL: baseURL
})

Axios.defaults.withCredentials = true

export default Axios
