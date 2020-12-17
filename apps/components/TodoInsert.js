/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {TextInput, View, StyleSheet, Button} from 'react-native';

const TodoInsert = ({onAddTodo}) => {

  let [newTodoItem, setNewTodoItem] = useState('');

  const handleTodoInput = (newTodo) => {
    setNewTodoItem(newTodo);
  };

  const handleAddTodo = ( ) => {
    if (newTodoItem === '') { // 값이 없을때 추가되지 않도록 하는 기능(기술자의 매너)
      return;
  }
    //console.log(`newTodoItem ${newTodoItem}`);
      onAddTodo(newTodoItem.replace('\n',''));  // 함수를 보냄
      setNewTodoItem('');      // 빈 값
  };

  const handleKeyPress = (e) => {
    if (e.nativeEvent.key === 'Enter') {
      handleAddTodo();
    }
};

  return (
    <View style={styles.inputContainer}>
      <TextInput
          style={styles.input}
          placeholder={'할일을 입력하세요'}
          placeholderTextColor={'#999'}
          autoCorrect={true}
          onChangeText={handleTodoInput}
          value={newTodoItem}
          onKeyPress={handleKeyPress}
      />
      <View style={styles.button}>
        <Button title={'＋ADD'} onPress={handleAddTodo}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
  },

  input: {
      flex: 1,
      padding: 20,
      borderBottomColor: '#9E9E9E',
      borderBottomWidth: 1,
      fontSize: 20,
      marginLeft: 20,
      width: '75%',
  },
    button: {
        marginRight: 20,
    },
});

export default TodoInsert;
