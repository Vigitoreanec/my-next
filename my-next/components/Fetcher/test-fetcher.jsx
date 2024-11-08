import { useMemo, useState } from "react"
import { Fetcher } from "."
import { User } from "../JS-PH/User"

export function TestFetcher() {
    return <>
        <Test1 />
        <Test2 />
        <Test3 />
    </>


}

function Test1() {
    const
        [id, setId] = useState(1),
        url = useMemo(() =>
            new URL('https://jsonplaceholder.typicode.com/users/' + id), [id]),
        [date, setDate] = useState(null)
    return <fieldset>
        <legend> Fetcher </legend>
        <input type="number" value={id} onInput={event => setId(+event.target.value)} />
        <Fetcher url={url} setDate={setDate}>
            <User user={date} />
        </Fetcher>
    </fieldset>
}
function UserList({ users }) {
    return <ol>
        {users.map(({ name }) => <li key={name}>{name}</li>)}
    </ol>
}

function Test2() {
    const
        url = 'https://jsonplaceholder.typicode.com/users/',
        [date, setDate] = useState(null);
    return <fieldset>
        <legend> Fetcher List </legend>
        <Fetcher url={url} setDate={setDate}>
            <UserList users={date} />
        </Fetcher>
    </fieldset>
}

function Test3() {
    const [date, setDate] = useState(null);
    return <fieldset>
        <legend>Fetcher Button</legend>
        {date
            ? <UserList users={date} />
            : <button onClick={() => {
                fetch('https://jsonplaceholder.typicode.com/users/')
                    .then(res => res.json())
                    .then(users => setDate(users));
            }}>load</button>
        }

    </fieldset >
}