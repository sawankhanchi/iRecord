import React, { Component, } from 'react';
import { PropTypes } from 'prop-types';
import {
    Button,
    Dimensions, 
    Image,
    Text,
    StyleSheet,
    View,
    Modal, 
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native';
import { defaultStyles } from './styles';

const { width, height } = Dimensions.get('window');
const cols = 2, rows = 3;

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
                <TouchableOpacity style={styles.container} onPress={() => this.setModalVisible(true) } >
                    <View style={styles.imageContainer}>
                        <Image source={{uri: record.cover}} style={styles.image} />
                    </View>
                    <Text style={styles.text}>{record.artist}</Text>
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        console.log('Modal closed')
                    }}>
                    <View style={{marginTop: 50}}>
                        <View>
                            <View style={styles.modalContainer}>
                                <Image source={{uri: record.cover}} style={styles.modalImage}/>
                            </View>
                            <Text style={styles.ModalText}>{record.artist}</Text>
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
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        marginBottom: 10,
        height: (height - 50 - 50) / rows - 10,
        width: (width - 40) / cols - 10,
    },
    modalContainer: {
        marginLeft: 35,
        marginTop: 10,
        height: 300,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        flex: 1,
    }, 
    modalImage: {
        borderRadius: 10,
        ...StyleSheet.absoluteFillObject,
    },
    ModalText: {
        marginLeft: 35,
    },
    image: {
        borderRadius: 10,
        ...StyleSheet.absoluteFillObject,
    }, 
    artist: {
        ...defaultStyles.text,
        fontSize: 14,
        marginTop: 4,
    }, 
    genre: {
        ...defaultStyles.text,
        color: '#BBBBBB',
        fontSize: 12,
        lineHeight: 14,
    }
});