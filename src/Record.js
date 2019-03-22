import React, { Component, } from 'react';
import { PropTypes } from 'prop-types';
import {
    Dimensions, 
    Image,
    Text,
    View,
    Button,
    Modal, 
    TouchableHighlight,
    Alert,
} from 'react-native';

export default class Record extends Component {
    state = {
        modalVisible: false
    }
            
    static propTypes = {
        record: PropTypes.object.isRequired,
    }
    
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }


    render() {
        const { record } = this.props;

        return (
            <View>
                <Text>{record.artist}</Text>

                <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text>See More</Text>
                </TouchableHighlight>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        console.log('Modal closed')
                    }}>
                    <View style={{marginTop: 50}}>
                        <View>
                        <Text>{record.name}</Text>
                        <TouchableHighlight
                            onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <Text>Hide Modal</Text>
                        </TouchableHighlight>
                        </View>
                    </View>
                    </Modal>
            </View>
        )
    }
}
