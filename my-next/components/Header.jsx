import Link from "next/link";
import { nav } from '@/styles/Header.module.css';

const
    pages = [
        { href: '/', name: 'Home' },
        { href: '/like-buttons', name: 'Like-Buttons Demo' }
    ]

export function Header() {
    return <header>
        Header TODO LIst
        <nav className={nav}>
            <ul>
                {pages.map(page =>
                    <Link href={page.href} key={page.href}>{page.name}</Link>
                )}
            </ul>
        </nav>
    </header>
}