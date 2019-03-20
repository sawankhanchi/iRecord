import React, { Component, Proptypes } from 'react';
import {
    Dimensions, 
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { defaultStyle } from './styles';

const { width, height } = Dimensions.get('window');
const cols = 3, rows = 3;

export default class RecordCover extends Component {
    static propTypes = {
        record: PropTypes.object.isRequired,
        onOpen: PropTypes.func.isRequired
    }

    render() {
        const { record, record: {artist, cover}, onOpen } = this.props;

        return (
            <TouchableOpacity style={styles.container} onPress={() => onOpen(record) } >
                <View style={styles.imageContainer}>
                    <Image source={{uri: poster}} style={styles.image} />
                </View>
                <Text style={styles.text} numberOfLines={1}>{title}</Text>
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
    title: {
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