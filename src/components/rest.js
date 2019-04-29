import axios from 'axios';

function rest()
{
    var token = localStorage.getItem('fcm_token');

    var instance = axios.create({
        baseURL: 'http://localhost:8080',
        timeout: 10000,
        headers: { // key: value
            'x-access-token': token
        }
    });

    return instance;
}

export default rest;