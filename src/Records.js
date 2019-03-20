import React, { Component } from 'react';
import { 
    ScrollView, 
    StyleSheet,
    View,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import RecordCover from './RecordCover';
import { records } from './data';

@connect(
    state => ({
        records: state.records,
        loading: state.loading,
    }),
    dispatch => ({
        refresh: () => dispatch({type: 'GET_RECORD_DATA'})
    }),
)

export default class Records extends Component {
    render() {
        const { records, loading, refresh } = this.props;
        
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
        paddingTop: 40,
    }, 
    scrollContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
})