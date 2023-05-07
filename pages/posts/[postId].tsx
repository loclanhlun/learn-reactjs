import {
    GetStaticPaths,
    GetStaticPathsContext,
    GetStaticProps,
    GetStaticPropsContext,
} from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'

export interface PostDetailsPageProps {
    post: any
}

export default function PostDetailsPage({ post }: PostDetailsPageProps) {
    const router = useRouter()

    if (router.isFallback) {
        return (
            <div style={{ fontSize: '2rem', textAlign: 'center' }}>
                Loading...
            </div>
        )
    }
    return (
        <div>
            <h1>Post Details Page</h1>
            <h2>{post.title}</h2>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async (
    context: GetStaticPathsContext
) => {
    console.log('\nGET STATIC PATHS!')
    const resp = await fetch(
        'https://js-post-api.herokuapp.com/api/posts?_page=1'
    )
    const data = await resp.json()
    return {
        paths: data.data.map((item: any) => ({ params: { postId: item.id } })),
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<PostDetailsPageProps> = async (
    context: GetStaticPropsContext
) => {
    console.log('\nGET STATIC PROPS!', context.params?.postId)

    const postId = context.params?.postId
    const resp = await fetch(
        `https://js-post-api.herokuapp.com/api/posts/${postId}`
    )
    const data = await resp.json()

    return {
        // ở phía server-side
        // run lúc build-time
        props: {
            post: data,
        },
        revalidate: 5,
    }
}
