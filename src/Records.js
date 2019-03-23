import React, { Component } from 'react';
import { 
    Button,
    ScrollView,
    Modal, 
    View,
    StyleSheet,
    TextInput,
    Text,
    RefreshControl,
} from 'react-native';
import Record from './Record';
import LoadingScreen from './LoadingScreen';
import { connect } from 'react-redux';
import { apiMiddleware, reducer } from './redux';
import { createStore, applyMiddleware } from 'redux';

const store = createStore(reducer, {}, applyMiddleware(apiMiddleware));

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
        modalVisible: false,
        text: '',
        image: '',
    }
        
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    submitInput() {
        debugger;
        if (this.state.text != '' && this.state.image != '') {
            debugger;
        }
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
                <View style={styles.addRecordContainer}>
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
                            <View style={styles.addRecordModal}>
                            <Text>Artist</Text>
                                <TextInput
                                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                                    onChangeText={(text) => this.setState({text})}
                                    value={this.state.text}
                                />
                                <Text>Record Cover URL</Text>
                                <TextInput
                                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                                    onChangeText={(image) => this.setState({image})}
                                    value={this.state.image}
                                />

                                <View style={styles.buttonContainer}>
                                    <Button 
                                        onPress={() => {this.submitInput()}}
                                        title="Submit"
                                        color="blue"
                                        accessibilityLabel="Submit record"
                                    />

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
    addRecordModal: {
        width: 320,
        marginLeft: 30,
    },
    scrollContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    }, 
    buttonContainer: {
        flexDirection: 'row',
        marginLeft: 80,
        width: 120,
    },
    addRecordContainer: {
        backgroundColor: 'black',
        marginLeft: 230,
        marginBottom: 12,
        width: 120,
        marginTop: 10,
    }
})