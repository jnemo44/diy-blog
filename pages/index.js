import Head from 'next/head'
import Link from 'next/link'
import { format, parseISO } from 'date-fns';
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { getAllPosts } from '../lib/data'

export default function Home({ posts }) {
  return (
    <div className='font-Poppins'>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="space-y-4">
        {posts.map((item) => (
          <BlogPostList key={item.slug} {...item} />
        ))}
      </div>



    </div>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts();
  return {
    props: {
      posts: allPosts.map(({ data, content, slug}) => ({
        ...data,
        date: data.date,
        content,
        slug,
      })),
    },
  };
}

function BlogPostList({ slug, title, date, content}) {
  return (
    <Link href={`/blog/${slug}`}>
      <div className="border-gray-200 border-2 rounded-lg shadow hover:shadow-md hover:border-green-500 p-4 transition duration-300 ease-in-out">
        <div className="font-bold">
          {title}
        </div>
        <div className="text-gray-500 text-sm">{date}</div>
        <div className='prose'>{content.substr(0,200)}{'...'}</div>
      </div>
    </Link>
  )
}