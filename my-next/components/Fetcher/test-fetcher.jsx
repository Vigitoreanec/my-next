import { useMemo, useState } from "react"
import { Fetcher } from "."
import { User } from "../JS-PH/User"

export function TestFetcher() {
    return <>
        <Test1 />
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
        <legend> Fetcher </legend>
        <Fetcher url={url} setDate={setDate}>
            <UserList users={date} />
        </Fetcher>
    </fieldset>
}