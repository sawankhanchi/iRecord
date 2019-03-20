import React, { Component } from 'react';
import { 
    ScrollView, 
    StyleSheet,
    View,
} from 'react-native';
import RecordCover from './RecordCover';
import { records } from './data';

export default class Records extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    {records.map((record, index) => <RecordCover 
                        record={record}
                        onOpen={this.openRecord}
                        key={index}
                    />)}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
    }, 
    scrollContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
})