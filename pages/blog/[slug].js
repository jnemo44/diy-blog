import Head from 'next/head';
import { blogPosts } from '../../lib/data';

export default function BlogPage({ title, date, content }) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1 className="text-bold">{title}</h1>
                <div>{content}</div>
            </main>

        </div>
    )
}

export async function getStaticProps(context) {
    const { params } = context;
    return {
        props: blogPosts.find(post => post.slug === params.slug), // will be passed to the page component as props
    }
}

export async function getStaticPaths() {

    return {
        paths: blogPosts.map((post) => ({
            params: {
                slug: post.slug,
            },
        })),
        fallback: false, // can also be true or 'blocking'
    }
}