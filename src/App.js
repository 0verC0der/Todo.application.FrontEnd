import logo from './logo.svg';
import './App.css';
import { Fragment, useEffect, useState } from 'react';
import TodoItem from './components/todoItem';

function App() {
  const [todoItems, setTodoItems] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(()=> {

    if(!todoItems) {
      fetch('https://todo-springboot-application.herokuapp.com/api/todoItems')
        .then(response => response.json())
        .then(data => {
          //console.log(data);
          setTodoItems(data);
        });

        fetch('https://todo-springboot-application.herokuapp.com/api/users')
        .then(response => response.json())
        .then(data => {
          //console.log(data);
          setUsers(data);
        });
    }
  }, [todoItems], [users]);

  function addNewTodoItem(){
    fetch(`https://todo-springboot-application.herokuapp.com/api/todoItems/`, {
      method: "POST",
      headers: {
          "content-type": "application/json",
      }, 
      body: JSON.stringify('rr')
    }).then(response => response.json())
      .then(data => {
         setTodoItems([...todoItems, data]);
      });
  }

  function handleDeleteTodo(item){
    const uptadeTodoItems = todoItems.filter(aTodo => aTodo.id !== item.id);
    setTodoItems([...uptadeTodoItems]);
  }
    
  return (
    <>
        <div>
          <label>
              Add new task 
              <input type="button" value="Ok" name="ok_btn" onClick={addNewTodoItem}/>

            </label>
        </div>

        <div> 
          {todoItems ? todoItems.map (todoItem => {
          return <TodoItem key={todoItem.id} data={todoItem} emitDeleteTodoItem={handleDeleteTodo} />}) 
          : 'loading data...'}
        </div> 

        <div>
          {users ? users.map(user => {
            return (
              <Fragment key={user.id}>
                <span>{user.username}</span>
              </Fragment>
            )
          }) : 'loading data-user...'}
        </div>
      
    </>   
  );
}

export default App;
