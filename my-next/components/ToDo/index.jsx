
import { useState, useCallback, memo, useRef } from "react"

export function ToDoApp() {
    const
        [list, setList] = useState([
            new ListItem('Дело №1'),
            new ListItem('Дело №2')
        ]),
        delItem = useCallback(id => setList(prev => {
            // const
            //     index = prev.findIndex(item => item.id == id);
            // return prev.toSpliced(index, 1)
            return prev.filter(item => item.id != id)
        }), []),
        checkedCheckBox = useCallback(id => setList(prev => {
            const
                index = prev.findIndex(item => item.id == id);
            return prev.with(index, prev[index].cloneAndItemChecked())
        }), []),
        addItem = useCallback(text =>
            setList(prev => [...prev, new ListItem(text)]), []);

    return <fieldset>
        <legend>To Do App</legend>
        <Form addItem={addItem} />
        <List
            list={list}
            delItem={delItem}
            checkedCheckBox={checkedCheckBox} />
        {/* коллбак который вызовет компонент для передачи вверх*/}
    </fieldset>
}

const Form = memo(function ({ addItem }) {// функция тунель для дочергено компонента, пробрасываем пропс
    console.debug('Form');
    const
        [value, setValue] = useState('-value-'),        //value->button 
        ref = useRef(null),
        onClicked = useCallback(() => {
            addItem(ref.current);
            setValue('')
        }, []);

    ref.current = value;

    return <fieldset>
        <legend>Form</legend>
        <input
            value={value}
            // onInput={event => setValue(event.target.value)
            onInput={({ target: { value } }) => setValue(value)} />

        {/*button-> value */}
        <Button onClicked={onClicked}>
            Add
        </Button> {/* // компонент функция */}
    </fieldset>
});

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

const Item = memo(function ({ item, delItem, checkedCheckBox }) {
    console.debug('Item', item);
    const
        { id, checked, text } = item,
        onClicked = useCallback(() => delItem(id), [id]);
    return <li>
        <input
            type="checkbox"
            checked={checked}
            onChange={() => checkedCheckBox(id)} />
        <span
            style={{ textDecoration: checked ? 'line-through' : 'none' }}>
            {text}
        </span>
        <Button onClicked={onClicked}>✖</Button>
    </li>
});

const Button = memo(function ({ onClicked, children }) { // props 'onClick', children - псевдо-пропс для потомков
    console.debug('Button', children);
    return <button onClick={onClicked}> {children} </button>
});

class ListItem {
    checked = false;
    id = Math.random();

    constructor(text) {
        Object.assign(this, { text });  // this.text = text
    }

    cloneAndItemChecked() {
        const
            clone = new ListItem;
        Object.assign(clone, this, { checked: !this.checked });
        // this.checked = !this.checked;
        return clone;
    }
}