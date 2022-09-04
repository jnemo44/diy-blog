import Head from 'next/head';
import { blogPosts } from '../../lib/data';
import { format, parseISO} from 'date-fns';

export default function BlogPage({ title, date, content }) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div className="border-b-2 border-gray-200 mb-4">
                <h2 className="text-bold text-xl">{title}</h2>
                <div className="text-gray-500 text-sm">
                    {format(parseISO(date),'MMMM do, uuu')}
                    </div>
                    </div>
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