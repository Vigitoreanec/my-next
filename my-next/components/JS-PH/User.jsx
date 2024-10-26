

export function User({ user }) {
    const
        { id, name, email, phone } = user;
        
    return <fieldset>
<ul>
    <li>id: {user.id}</li>
    <li>Name: {user.name}</li>
    <li>Email: {user.email}</li>
    <li>Phone: {user.phone}</li>
</ul>
    </fieldset>
}