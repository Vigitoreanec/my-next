import { useState } from "react";

export function ToDoList() {
    const
        [tasks, setTasks] = useState([
            { id: 1, value: "Task 1", checked: false },
            { id: 2, value: "Task 2", checked: true }]),
        [todo, setToDo] = useState('')

    const addTask = () => {
        let newToDo = {
            id: Math.random(),
            value:  todo ,
            checked: false
        };
        let newTask = [newToDo, ...tasks];
        setTasks(newTask);
        setToDo("");
    };
    console.log(tasks);

    const deleteTask = (id) => {
        let newTask = tasks.filter(item => item.id != id);
        setTasks(newTask)

    };


    const handleCheck = (id) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id == id) {
                return { ...task, checked: !task.checked };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    return (<div className="list">
        <p>TODO List</p>
        <input
            placeholder="Введите задачу ..."
            value={todo}
            onChange={(e) => setToDo(e.target.value)}
        >
        </input>
        <button onClick={addTask}>Добавить</button>
       
        
            <Todos
                tasks={tasks}
                setTasks={setTasks}
                checked={handleCheck}
                deleteTask={deleteTask}
            />
        
    </div>)
}
// Функциональный компонент для одной задачи
function Task(props) {
    const { task, checked, deleteTask } = props;
    return (
        <li key={task.id}>
            <input
                type="checkbox"
                checked={task.checked}
                onChange={() => checked(task.id)}
            />
            <span
                style={{ textDecoration: task.checked ? 'line-through' : 'none' }}>
                {task.value}
            </span>
            <button onClick={() => deleteTask(task.id)}>❌</button>
        </li>
    );
}
// Функциональный компонент для списка задач
function Todos(props) {
    const { tasks,setTasks,value, checked, deleteTask } = props;
    return (
        <ol>
            {tasks.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    checked={checked}
                    deleteTask={deleteTask}
                />
            ))}
        </ol>
    );
}

// function Todos({ tasks, setTasks }) {


//     return (<fieldset>
//         <legend>Tasks
//             <ol>
//                 {tasks.map(item =>
//                     <li key={item.id}>
//                         <input
//                             type="checkbox"
//                             checked={item.checked}
//                             onChange={item.checked = !item.checked}></input>
//                         <span>{item.value}</span>
//                         <button onClick={deleteTask(item.id)}>❌</button>
//                     </li>)}
//             </ol>

//         </legend>
//     </fieldset >)
// }