
import { useState } from "react"

export function ToDoApp() {
    const
        [list, setList] = useState([
            new ListItem('Дело №1'),
            new ListItem('Дело №2')
        ]);
    return <fieldset>
        <legend>ToDo App</legend>
        <Form addItem={text => setList(prev => [...prev, new ListItem(text)])} />
        <List list={list} />
        {/* коллбак который вызовет компонент для передачи вверх*/}
    </fieldset>
}

function Form({ addItem }) {// функция тунель для дочергено компонента
    const
        [value, setValue] = useState('-value-');
    return <fieldset>
        <legend>Form</legend>
        <input
            value={value}
            // onInput={event => setValue(event.target.value)
            onInput={({ target: { value } }) => setValue(value)} />
        <Button onClicked={() => {
            addItem(value);
            setValue('')
        }}>
            Add
        </Button> {/* // компонент функция */}
    </fieldset>
}

function List({ list }) {
    return <fieldset>
        <legend>List</legend>
        <ol>
            {list.map(item =>
                <Item key={item.id} item={item} />
            )}
        </ol>
    </fieldset>
}

function Item({ item }) {
    const
        { id, checked, text } = item;
    return <li>
        <input
            type="checkbox"
            checked={checked} />
        {text}
        <Button>✖</Button>
    </li>
}

function Button({ onClicked, children }) { // props 'onClick', children - псевдо-пропс для потомков
    return <button onClick={onClicked}> {children} </button>
}

class ListItem {
    checked = false;
    id = Math.random();

    constructor(text) {
        Object.assign(this, { text });
    }


}