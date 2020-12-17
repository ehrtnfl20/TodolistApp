/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

const TodoListItem = ({text, id, checked, onRemove, onToggle}) => {

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => onToggle(id, checked)}>
                {checked === 0 ? (
                    <View style={styles.circle}>
                        <Icon name ="circle" size={30} color="#ff8080"  style={styles.icon} />
                    </View>
                ) : (
                    <View style={styles.circle} >
                         <Icon name ="check-circle" size={30} color="#ff8080"  style={styles.icon} />
                    </View>
                )}
            </TouchableOpacity>
            <Text
                style={[styles.itemText,
                    checked === 0 ? styles.strikeText : styles.unstrikeText ]}>{text}</Text>
            <TouchableOpacity style={styles.delete}>
                    <Icon name="delete" size={30} color="#ff8080" onPress={() => onRemove(id)} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        borderBottomColor: '#9E9E9E',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
    },
    circle: {
        marginLeft: 20,
        marginRight: 20,
        width: 30,
        height: 30,
        borderColor: '#ff9999',
        borderWidth: 2,
        borderRadius: 2,
    },
    checkedCircle: {
        marginLeft: 20,
        marginRight: 20,
    },
    itemText: {
        fontSize: 20,
        marginVertical: 15,
        flex: 1,
    },
    strikeText: {
        color: '#9E9E9E',
        textDecorationLine: 'line-through',
    },
    unstrikeText: {
        color: '#ff9999',
    },
    delete: {
        marginLeft: 20,
        marginRight: 20,
    },
    icon: {
        margin: 10,
    },
});

export default TodoListItem;
