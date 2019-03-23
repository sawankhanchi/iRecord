import React, { Component} from 'react';
import {
    Text, 
    Button,
} from 'react-native';

export default class AddRecords extends Component {
    render() {
        const { navigate } = this.props.navigation;
        
        return (
            <View>
                <Button
                    title="Back"
                    onPress={() =>
                        this.props.navigation.navigate('Records')
                    }
                />
                <Text>Test</Text>
            </View>
        )
    }
}