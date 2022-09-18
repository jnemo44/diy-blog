import Head from 'next/head';
import { getAllPosts } from '../../lib/data';
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { format, parseISO } from 'date-fns';

export default function BlogPage({ title, date, content }) {
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
                    <div
                        className="mx-auto mt-10 bg-white dark:bg-slate-900 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl"
                    >
                        <h3
                            class="text-slate-900 dark:text-white text-base font-medium tracking-tight"
                        >
                            Writes Upside-Down
      </h3>
                        <p class="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                            The Zero Gravity Pen can be used to write in any orientation, including
                            upside-down. It even works in outer space.
      </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className='prose dark:text-slate-400'>
                            <MDXRemote {...content}></MDXRemote>
                        </div>
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