import { useState } from "react"
import { Fetcher } from "../Fetcher"
import { ObjectTable } from ".";

export function TestTable() {
    return <>
        <fieldset>
            <legend>Table Users</legend>
            <Test1 />
        </fieldset>
    </>
}

export function Email({ email }) {
    return <a href={'mailto:' + email}>{email}</a>
}

function Test1() {
    const [users, setUsers] = useState(null),
        columns = [
            { title: 'Id', content: user => +user.id },
            { title: 'Name', content: ({ name }) => name },
            { title: 'Phone', content: ({ phone }) => <a href={'tel:phone'}>{phone}</a> },
            { title: 'Email', content: ({ email }) => <Email email={email} /> }
        ];


    return <fieldset>
        <Fetcher
            url="https://jsonplaceholder.typicode.com/users/"
            setDate={setUsers} >
            <ObjectTable data={users} columns={columns} />
        </Fetcher>
    </fieldset>
}