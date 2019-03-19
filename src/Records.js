import React, { Component } from 'react';
import { 
    ScrollView, 
    Text,
    View,
} from 'react-native';
import { records } from './data';

export default class Records extends Component {
    render() {
        return (
            <View>
                <ScrollView>
                    {records.map((record, index) => <Text key={index}>{record.artist}</Text>)}
                </ScrollView>
            </View>
        )
    }
}