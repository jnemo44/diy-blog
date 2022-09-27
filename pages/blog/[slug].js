import Head from 'next/head';
import { getAllPosts } from '../../lib/data';
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

export default function BlogPage({ title, date, content, description }) {
    return (
        <div className="font-Poppins">
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col items-center border-b-2 border-green-500 space-y-1">
                        <h2 className="font-bold text-xl">{title}</h2>
                        <div className="text-gray-500 text-sm pb-2">
                            {date}
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <article className='prose dark:prose-invert'>
                            <MDXRemote {...content}></MDXRemote>
                        </article>
                    </div>
                </div>
            </main>

        </div>
    )
}

export async function getStaticProps(context) {
    const { params } = context;
    const allPosts = getAllPosts();
    const { data, content } = allPosts.find(post => post.slug === params.slug)
    const mdxSource = await serialize(content)
    return {
        props: {
            ...data,
            content: mdxSource,
            date: data.date,
        },
    }
}

export async function getStaticPaths() {
    return {
        paths: getAllPosts().map((post) => ({
            params: {
                slug: post.slug,
            },
        })),
        fallback: false, // can also be true or 'blocking'
    }
}