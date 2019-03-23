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
const axios = require('axios');

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
        artist: '',
        image: '',
    }
        
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    submitInput() {
        if (this.state.artist != '' && this.state.image != '') {
            const obj = {
                artist: this.state.artist,
                cover: this.state.image,
              };
              axios.post('http://localhost:4000/records/add', obj)
                  .then(res => console.log(res.data));
              
              this.setState({
                artist: '',
                image: '',
              })
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
                                    onChangeText={(artist) => this.setState({artist})}
                                    value={this.state.artist}
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