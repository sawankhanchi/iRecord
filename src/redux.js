import { Platform } from 'react-native';

const axios = require('axios');
const API = 'http://127.0.0.1:3000/v1';

export const apiMiddleware = store => next => action => {
    next(action);

    switch(action.type) {
        case 'GET_RECORD_DATA':
            store.dispatch({type: 'GET_RECORD_DATA_LOADING'});

            axios.get(`${API}/records.json`)
                .then(function(response) {
                    return response.data.records
                })
                .then(data => next({
                    type: 'GET_RECORD_DATA_RECEIVED',
                    data,
                }))  
        default:
                break;

    }
}

export const reducer = (state = {records: [], loading: true}, action) => {
    switch(action.type) {
        case 'GET_RECORD_DATA_LOADING':
            return {
                ...state,
                loading: true,
            }
        case 'GET_RECORD_DATA_RECEIVED':
            return {
                records: action.data,
                loading: false,
            }
        case 'GET_RECORD_DATA_ERROR':
            return state;
        default:
            return state;
    }
}