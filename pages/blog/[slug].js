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
                    <div className="relative sm:flex sm:justify-center border-b-2 border-green-500">
                        <h2 className="font-bold text-xl mb-1">{title}</h2>
                        <div className="absolute bottom-1 right-0 text-gray-500 text-sm items-end">
                            {date}
                        </div>
                    </div>
                    <div className="flex flex-col sm:items-center shrink">
                        <article className='prose dark:prose-invert max-w-prose'>
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