import { GetStaticProps, GetStaticPropsContext } from 'next'
import React from 'react'

export interface PostsPageProps {
    posts: any[]
}

export default function PostsPage({ posts }: PostsPageProps) {
    return (
        <div>
            <h1>Posts Page</h1>
            <ul>
                {posts.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>
    )
}

export const getStaticProps: GetStaticProps<PostsPageProps> = async (
    context: GetStaticPropsContext
) => {
    const resp = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await resp.json()

    return {
        // ở phía server-side
        // run lúc build-time

        props: {
            posts: data.map((item: any) => ({
                id: item.id,
                title: item.title,
            })),
        },
    }
}
