

export function User({ user }) {
    const
        { id, name, email, phone, website } = user;

    return <fieldset>
        <ol>
            <li>id: {user.id}</li>
            <li>Name: {user.name}</li>
            <li>UserName: {user.username}</li>
            <li>Email: {user.email}</li>
            <li>Phone: {user.phone}</li>
            <li>Website: {user.website}</li>
            
        </ol>
    </fieldset>
}