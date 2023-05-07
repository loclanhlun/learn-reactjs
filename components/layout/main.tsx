import { LayoutProps } from '@/models/index'
import Link from 'next/link'
import React, { useEffect } from 'react'

export function MainLayout({ children }: LayoutProps) {
    useEffect(() => {
        console.log('Main layout mounting')
        return () => {
            console.log('Main layout unmounting')
        }
    }, [])
    return (
        <div>
            <h1>Main Layout</h1>
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
