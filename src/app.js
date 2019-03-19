import React, { Component } from 'react';
import { 
    Navigator,
} from 'react-native';
import Records from './Records';

const RouteMapper = (route, navigator) => {
    if (route.name === 'records') {
        return <Records navigator={navigator} />
    }
};

export default class App extends Component {
    render() {
        return (
            <Navigator 
                initialRoute={{ name: 'records' }}
                configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
                renderScene={RouteMapper}
            />
        )
    }
}