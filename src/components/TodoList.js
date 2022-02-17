import React, { useState} from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    fetch('https://todo-springboot-application.herokuapp.com/api/todoItems')
           .then(response => response.json())
           .then(data => {
             setTodos(data);
           });

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    console.log(...todos);
  };

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const updateTodo = (todoId, newValue) =>{
      if (!newValue.text || /^\s*$/.test(newValue.text)){
        return null;
      }
      //setTodos(prev => prev.map(item => (item.id === todoId ? newValue: item)))
  }   

  return (
    <>
      <div>
        <h1>Что делаем сегодня?</h1>
        <TodoForm onSubmit={addTodo} />
        <Todo todos={todos} completeTodo={completeTodo} 
        removeTodo ={removeTodo} updateTodo = {updateTodo} />
      </div>
    </>
  );
}

export default TodoList;
