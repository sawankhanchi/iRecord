import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { apiMiddleware, reducer } from './redux';
import {Navigator} from 'react-native-deprecated-custom-components'
import Records from './Records';

const store = createStore(reducer, {}, applyMiddleware(apiMiddleware))

store.dispatch({type: 'GET_RECORD_DATA'});

const RouteMapper = (route, navigator) => {
    if (route.name === 'records') {
        return <Records navigator={navigator} />
    }
};

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Navigator
                initialRoute={{ name: 'records' }}
                configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
                renderScene={RouteMapper}
                />
            </Provider>    
        )
    }
}