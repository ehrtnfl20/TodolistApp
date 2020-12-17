/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, ScrollView, Text} from 'react-native';

import TodoListItem from './TodoListItem';

const TodoList = ({todos, onRemove, onToggle}) => {

    const TodoListItems = todos.map((item, index) =>
    <TodoListItem
        key={index} id={item.id} text={item.textValue} checked={item.checked}
        onRemove={onRemove} onToggle={onToggle}/>
    );

    return (
        <ScrollView contentContainerStyle={styles.listContainer}>
            {TodoListItems}
        </ScrollView>
  );
};

const styles = StyleSheet.create({
    listContainer: {
        alignItems: 'center',
    },
});

export default TodoList;
