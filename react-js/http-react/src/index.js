import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from "axios";

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

// eslint-disable-next-line
const myReqInterceptor = axios.interceptors.request.use(request => {
    // NOTE : You can add more configuration before sending a request.
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

// eslint-disable-next-line
const myResInterceptor = axios.interceptors.response.use(response => {
    // NOTE : You can add more configuration before recieve a response.
    return response;
}, error => {
    console.log(error);
    // By Promise.reject --> so you can catch an error locally
    return Promise.reject(error);
});

// NOTE : call eject  with that reference as an argument, to remove it
// axios.interceptors.request.eject(myReqInterceptor);
// axios.interceptors.response.eject(myResInterceptor);

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
