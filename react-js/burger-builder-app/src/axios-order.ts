import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-learning-5f3ed.firebaseio.com/'
})

export default instance;