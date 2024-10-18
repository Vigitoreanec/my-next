import { useState } from "react";

export function ToDoList(){
    const 
    [tasks, setTasks] = useState([]),
    [todo, setToDo] =useState('')

    const addTask = () =>{
        let newToDo = {
            id: Math.random(),
            value: {todo},
            checked: false
        }
        let newTask = [newToDo, ...tasks];
        setTasks(newTask);
    }
    console.log(tasks);



    return <div>
        <p>TODO List</p>
        <input 
        value={todo}
        onChange={(e)=>setToDo(e.target.value)}
        >
        </input>
        <button onClick={()=>addTask()}>Add</button>
    </div>
}  
