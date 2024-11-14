import { useState } from "react"
import { Fetcher } from "../Fetcher"
import { ObjectTable } from "."


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

export function MapLink({ geo, text }) {
    return <a href={`https://maps.google.com/maps?ll=${geo.lat},${geo.lng}`} >{text}</a>
}

function Test1() {
    const
        [users, setUsers] = useState(null),
        [selected, setSelected] = useState(null);
    return <fieldset onClick={event => {
        const
            id = event.target.closest('tbody tr[data-id]')?.dataset?.id;
        if (id == selected)
            setSelected(null)
        else
            setSelected(id);
    }}>
        <Fetcher
            url="https://jsonplaceholder.typicode.com/users"
            setDate={setUsers}
        >
            <ObjectTable data={users} columns={jsPhColumns} />
        </Fetcher>
    </fieldset>
}

export const
    jsPhColumns = [
        //{ title: '', content: user => String(user.id) == selected ? '✔' : '' },
        { title: 'Id', content: user => +user.id },
        //{ title: '', content: user => <button onClick={alert(user.company.name + ' | ' + user.company.catchPhrase)}>select</button> },

        { title: 'Name', content: ({ name }) => name },
        { title: 'Phone', content: ({ phone }) => <a href={'tel:phone'}>{phone}</a>, getData: ({ phone }) => phone },
        { title: 'Email', content: ({ email }) => <Email email={email} /> },
        { title: 'Address', content: ({ address }) => <MapLink geo={address.geo} text={`${address.city} ${address.street} ${address.suite}`} /> }
    ];
// function Test1() {
//     const [users, setUsers] = useState(null),
//         [selected, setSelected] = useState(null),
//         columns = [
//             { title: '', content: user => String(user.id) == selected ? '✔' : '' },
//             { title: 'Id', content: user => +user.id },
//             //{ title: '', content: user => <button onClick={alert(user.company.name + ' | ' + user.company.catchPhrase)}>select</button> },

//             { title: 'Name', content: ({ name }) => name },
//             { title: 'Phone', content: ({ phone }) => <a href={'tel:phone'}>{phone}</a> },
//             { title: 'Email', content: ({ email }) => <Email email={email} /> },
//             { title: 'Address', content: ({ address }) => <MapLink geo={address.geo} text={`${address.city} ${address.street} ${address.suite}`} /> }
//         ];


//     return <fieldset onClick={event => {
//         const
//             id = event.target.closest('tbody tr[data-id]')?.dataset?.id;
//         setSelected(id);
//     }}>

//         <Fetcher
//             url="https://jsonplaceholder.typicode.com/users/"
//             setDate={setUsers} >
//             <ObjectTable data={users} columns={columns} />
//         </Fetcher>
//     </fieldset>
// }