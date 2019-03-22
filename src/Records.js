import React, { Component } from 'react';
import { 
    ScrollView, 
    View,
    StyleSheet,
    Text,
    RefreshControl,
} from 'react-native';
import Record from './Record';
import { connect } from 'react-redux';

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
        const {loading, refresh } = this.props;

        let {listOfRecords} = {};
        if (this.props.records) {
            listOfRecords = this.props.records.map(function(record, index) {
                return (
                    <View>
                        <Record key={index} record={record}/>
                    </View>
                )
            })
        }

        return (
            <View style={styles.container}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={refresh}
                        />
                    }
                >
               {listOfRecords}    
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
        paddingLeft: 100,
    }
})