import Link from "next/link";
import { nav } from '@/styles/Header.module.css';

const
    pages = [
        { href: '/', name: 'Home' },
        { href: '/todo-optimization', name: 'ToDo List (Optimization)' },
        { href: '/like-buttons', name: 'Like-Buttons Demo' },
        { href: '/todoList', name: 'ToDo List (CLASS)' },
        { href: '/stand', name: 'Lifecycle-methods' },
        { href: '/users', name: 'JSON Placeholder Users' },
        { href: '/calendar', name: 'Calendar Demo' },
        { href: '/fetcher', name: 'Fetcher' },
        { href: '/objectTable', name: 'TableUsers' },
        { href: '/modification', name: 'Server Modification(Optim UI)' }

    ]

export function Header() {
    return <header>

        <nav className={nav}>
            <ul>
                {pages.map(page =>
                    <li key={page.href}>
                        <Link href={page.href} >{page.name}</Link>
                    </li>
                )}
            </ul>
        </nav>
        <br />
    </header>
}