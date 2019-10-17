import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://reactburgerbuilder-5c8bc.firebaseio.com/'
});

export default instance;