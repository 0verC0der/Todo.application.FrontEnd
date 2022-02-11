import React, { useEffect, useState } from "react";

const TodoItem = (props) => {
    const {emitDeleteTodoItem} = props;
    const [todoItem, setTodoItem] = useState(props.data);
    const [isDirty, setDirty] = useState(false);

    function updateIsComplete(){
        setDirty(true);
        setTodoItem({...todoItem, completed: !todoItem.completed});
    }

    useEffect(() => {
        if(isDirty){
            fetch(`http://localhost:8080/api/todoItems/${todoItem.id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(todoItem),
            }).then(response => response.json()).then(data => {
                setDirty(false);
                setTodoItem(data);
            }, [todoItem]);
        }
        
    },[todoItem, isDirty]);

    function updateTodo(event){
        setDirty(true);
        setTodoItem({...todoItem, content: event.target.value});
        
    }

    function deleteTodo(){
        fetch(`http://localhost:8080/api/todoItems/${todoItem.id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            }
        });

        emitDeleteTodoItem(todoItem);
    }

    return (
        <> 
            <div style={{marginTop: "2px"}}>
                <input 
                    type="checkbox" 
                    checked={todoItem.completed} 
                    onChange={updateIsComplete} 
                />
                {
                    todoItem.completed === true ? 
                    <span style={{textDecoration: "line-through"}}>{todoItem.content}</span> 
                    : <input type='text' value={todoItem.content} onChange={updateTodo}/>
                }
                <input type="button" value="del" style={{marginLeft:"7px", cursor:"pointer  "}} onClick={deleteTodo} />            
                <br></br>
            </div>
        </>
    );
}

export default TodoItem;