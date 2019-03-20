import React, { Component, } from 'react'; // PropTypes
import { PropTypes } from 'prop-types';
import {
    Dimensions, 
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { defaultStyles } from './styles';

const { width, height } = Dimensions.get('window');
const cols = 3, rows = 3;

export default class RecordCover extends Component {
    debugger;

    static propTypes = {
        record: PropTypes.object.isRequired,
        onOpen: PropTypes.func.isRequired
    }

    render() {
        const { record, record: {artist, cover}, onOpen } = this.props;

        return (
            <TouchableOpacity style={styles.container} onPress={() => onOpen(record) } >
                <View style={styles.imageContainer}>
                    <Image source={{uri: cover}} style={styles.image} />
                </View>
                <Text style={styles.text} numberOfLines={1}>{artist}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        marginBottom: 10,
        height: (height - 20 - 20) / rows - 10,
        width: (width - 10) / cols - 10,
    },
    imageContainer: {
        flex: 1,
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