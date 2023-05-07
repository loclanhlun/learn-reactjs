import { LayoutProps } from '@/models/index'
import Link from 'next/link'
import * as React from 'react'

export function AdminLayout({ children }: LayoutProps) {
    return (
        <div>
            <h1>Admin Layout</h1>
            <div>Sidebar</div>
            <Link href="/">
                <p>Home</p>
            </Link>
            <Link href="/about">
                <p>About</p>
            </Link>

            <div>{children}</div>
        </div>
    )
}
