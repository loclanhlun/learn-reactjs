import Header from '@/components/common/Header'
import { MainLayout } from '@/components/layout'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

// // dùng khi muốn component được import được render phía trình duyệt
// const Header = dynamic(() => import('@/components/common/Header'), {
//     ssr: false,
// })

export interface AboutPageProps {}

export default function AboutPage(props: AboutPageProps) {
    const [postList, setPostList] = useState([])
    const router = useRouter()

    const page = router.query?.page

    console.log('About query: ', router.query)

    useEffect(() => {
        if (!page) return
        ;(async () => {
            const resp = await fetch(
                `https://js-post-api.herokuapp.com/api/posts?_page=${page}`
            )
            const data = await resp.json()

            setPostList(data.data)
        })()
    }, [page])

    const handleClickNext = () => {
        router.push(
            {
                pathname: '/about',
                query: {
                    page: Number(page) + 1,
                },
            },
            undefined,
            { shallow: true }
        )
    }

    return (
        <div>
            <h1>About Page</h1>
            <Header />
            <ul className="post-list">
                {postList.map((post: any) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>

            <button onClick={handleClickNext}>Next Page</button>
        </div>
    )
}

AboutPage.Layout = MainLayout

export async function getStaticProps() {
    console.log('Get static props')

    return {
        props: {},
    }
}

// export async function getServerSideProps() {
//     return {
//         props: {},
//     }
// }
