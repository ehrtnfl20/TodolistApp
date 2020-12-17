/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Alert} from 'react-native';

import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'todo.db'});

const App = () => {
  //todos: {id: Number, textValue: String, checked: boolean}
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    //alert('useEffect');
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='todo_table'",
        [],
        function (tx, res) {
          //console.log('item: ', res.rows.length);
          if (res.rows.length === 0) {
            txn.executeSql('DROP TABLE IF EXISTS todo_table', []);
            txn.executeSql(
              `CREATE TABLE  IF NOT EXISTS todo_table (
                          id  INTEGER PRIMARY KEY AUTOINCREMENT,
                   textValue	TEXT NOT NULL,
                     checked	INTEGER NOT NULL DEFAULT 0);`,
              [],
            );
            console.log('table regen!');
          }
        },
      );
    }, []);
    todoListView();
  });

  const addTodo = (text) => {
    db.transaction(function (txn) {
      txn.executeSql(
        `INSERT INTO todo_table
              (textValue,checked)
          VALUES 
              (?,0)`,
        [text],
        function (tx, res) {
          console.log('res', res.rowsAffected);
          if (res.rowsAffected) {
            console.log('추가 성공');
          } else {
            console.log('추가 실패!');
          }
        },
      );
    }, []);
    todoListView();
  };

  const todoListView = () => {
    db.transaction((txn) => {
      txn.executeSql('SELECT * FROM todo_table', [], (tx, res) => {
        //console.log('record num :', res.rows.length);
        var temp = [];
        for (var i = 0; i < res.rows.length; ++i) {
          temp.push(res.rows.item(i));
        }
        setTodos(temp);
        //console.log('todo :', todos);
      });
    }, []);
  };

  const onToggle = (id, checked) => {
    db.transaction((txn) => {
      if (checked === 1) {
        txn.executeSql(
          'UPDATE todo_table SET checked = 0 WHERE id =?',
          [id],
          function (tx, res) {
            console.log(`res: ${res.rowsAffected}`);
            if (res.rowsAffected) {
              console.log('완료!');
            } else {
              console.log('NO');
            }
          },
        );
      } else {
        txn.executeSql(
          'UPDATE todo_table SET checked = 1 WHERE id =?',
          [id],
          function (tx, res) {
            console.log(`res: ${res.rowsAffected}`);
            if (res.rowsAffected) {
              console.log('완료!');
            } else {
              console.log('NO');
            }
          },
        );
      }
    });
    todoListView();
  };

  const onRemove = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    db.transaction((txn) => {
      txn.executeSql('DELETE FROM todo_table WHERE id = ?', [id], (tx, res) => {
        if (res.rowsAffected) {
          Alert.alert(
            '삭제 완료',
            '리스트 삭제',
            [{text: 'OK'}],
            {cancelable: false},
          );
        } else {
          alert('삭제 실패');
        }
      });
    });
    todoListView();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.appTitle}> Todolist </Text>
      <View style={styles.card}>
        <TodoInsert onAddTodo={addTodo} />
        <TodoList
          todos={todos}
          onRemove={onRemove}
          onToggle={onToggle} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff8080',
  },
  appTitle: {
    color: '#ffffff',
    fontSize: 45,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#ffffff',
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 24,
    marginLeft: 20,
  },
});

export default App;
