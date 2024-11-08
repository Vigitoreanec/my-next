
import { useState, useEffect } from "react";
import { User } from "./User";

export function GetUser() {
    const
        [id, setId] = useState(1);
    return <div>
        <input type="number" value={id} onInput={event => setId(+event.target.value)} />
        <FetchUser id={id} />
    </div>
}

function FetchUser({ id }) {
    const
        [user, setUser] = useState(1),
        [error, setError] = useState(null);

    useEffect(() => {
        async function load() {
            try {
                setUser(null),
                setError(null);
                const
                    responce = await fetch('https://jsonplaceholder.typicode.com/users/' + id),
                    data = await responce.json();
                setUser(data);
                if(!responce.ok) throw new Error(responce.status)
            }
            catch (err) {
                setError(err);
            }
        }
        load();
    }, [id]);

    if (error)
        return <span className="error">
            Error {error.toString()}
        </span>
    if (user)
        return <User user={user} />
    return <Spiner />
}

function Spiner() {
    return <div><process></process></div>
}