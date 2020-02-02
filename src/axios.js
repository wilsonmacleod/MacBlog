import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://dumpy-24fc9.firebaseio.com/'
})

export default instance;