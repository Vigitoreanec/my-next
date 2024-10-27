
import { useState } from "react"

export function ToDoApp() {
    const
        [list, setList] = useState([
            new ListItem('Дело №1'),
            new ListItem('Дело №2')
        ]),
        delItem = id => setList(prev => {
            const
                index = prev.findIndex(item => item.id == id);
            // return prev.toSpliced(index, 1)
            return prev.filter(item => item.id != id)
        }),
        checkedCheckBox = id => setList(prev => {
            const
                index = prev.findIndex(item => item.id == id);
            return prev.with(index, prev[index].itemChecked())
        });

    return <fieldset>
        <legend>ToDo App</legend>
        <Form addItem={text => setList(prev => [...prev, new ListItem(text)])} />
        <List
            list={list}
            delItem={delItem}
            checkedCheckBox={checkedCheckBox} />
        {/* коллбак который вызовет компонент для передачи вверх*/}
    </fieldset>
}

function Form({ addItem }) {// функция тунель для дочергено компонента, пробрасываем пропс
    console.debug('Form');
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

function List({ list, delItem, checkedCheckBox }) {
    console.debug('List');
    return <fieldset>
        <legend>List</legend>
        <ol>
            {list.map(item =>
                <Item key={item.id} item={item}
                    delItem={delItem} checkedCheckBox={checkedCheckBox} />
            )}
        </ol>
    </fieldset>
}

function Item({ item, delItem, checkedCheckBox }) {
    const
        { id, checked, text } = item;
    return <li>
        <input
            type="checkbox"
            checked={checked}
            onChange={() => checkedCheckBox(id)} />
        <span
            style={{ textDecoration: checked ? 'line-through' : 'none' }}>
            {text}
        </span>
        <Button onClicked={() => delItem(id)}>✖</Button>
    </li>
}

function Button({ onClicked, children }) { // props 'onClick', children - псевдо-пропс для потомков
    console.debug('Button');
    return <button onClick={onClicked}> {children} </button>
}

class ListItem {
    checked = false;
    id = Math.random();

    constructor(text) {
        Object.assign(this, { text });
    }

    itemChecked() {
        this.checked = !this.checked;
        return this;
    }
}