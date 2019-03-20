import { Platform } from 'react-native';

const API = Platform.OS === 'android'
    ? 'http://10.0.3.2:3000/v1'
    : 'http://localhost:3000/v1';

export const apiMiddleware = store => next => action => {
    next(action);

    switch(action.type) {
        case 'GET_RECORD_DATA':
            store.dispatch({type: 'GET_RECORD_DATA_LOADING'});

            fetch(`${API}/records.json`)
                .then(response => response.json())
                .then(data => next({
                    type: 'GET_RECORD_DATA_RECEIVED',
                    data
                }))
                .catch(error => next({
                    type: 'GET_RECORD_DATA_ERROR',
                    error
                }));
                break;
                
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
                loading: false, 
                records: action.data.records
            }
        case 'GET_RECORD_DATA_ERROR':
            return state;
        default:
            return state;
    }
}