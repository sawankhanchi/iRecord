import React, { Component } from 'react';
import { 
    Button,
    ScrollView,
    Modal, 
    View,
    StyleSheet,
    Text,
    RefreshControl,
} from 'react-native';
import Record from './Record';
import LoadingScreen from './LoadingScreen';
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
    state = {
        modalVisible: false
    }
        
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        const {loading, refresh } = this.props;

        let {listOfRecords} = {};
        if (this.props.records) {
            listOfRecords = this.props.records.map(function(record, index) {
                return (
                    <View key={index}>
                        <Record key={index} record={record}/>
                    </View>
                )
            })
        } else {
            return (
                <LoadingScreen />
            )
        }

        return (
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                        }}
                        title="Add Record"
                        color="white"
                        accessibilityLabel="Add Record"
                    />

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            console.log('Modal closed')
                        }}>
                        <View style={{marginTop: 50}}>
                            <View>
                                <Text>HI</Text>
                                <Button
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}
                                    title="Close"
                                    color="#841584"
                                    accessibilityLabel="Close Modal"
                                    />
                                </View>
                            </View>
                        </Modal>
                    </View>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
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
        paddingTop: 40,
    }, 
    scrollContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    }, 
    buttonContainer: {
        backgroundColor: 'black',
        marginLeft: 230,
        marginBottom: 12,
        width: 120,
        marginTop: 10,
    }
})