import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import db from '../lib/db'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { getAllPosts } from '../lib/data'

export default function Home({ posts, stravaStats }) {
  const run_total_miles = Math.round(stravaStats.all_run_totals.distance*0.000621371)
  const run_total_elevation = Math.round(stravaStats.all_run_totals.elevation_gain*3.28084)
  const earth_percent_complete = (run_total_miles/24901*100).toFixed(2)
  const earth_miles_to_go = (24901-run_total_miles).toLocaleString('en-US')
  const run_total_time = Math.round(stravaStats.all_run_totals.moving_time/120)

  posts.sort((a, b) => {
    return (new Date(b.date) - new Date(a.date))
  })

  return (
    <div className='font-Poppins'>
      <Head>
        <title>Joe's Blog</title>
        <meta name="description" content="Generated by create next app and built by me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-slate-100 dark:bg-slate-800 border shadow-md rounded-lg space-y-2 p-4 mb-4">
        <div className="flex flex-col space-y-2 justify-center items-center sm:flex-row md:space-x-4 md:space-y-0">
          <div className="text-lg">🏃‍♂️ {run_total_miles.toLocaleString('en-US') +' miles'}</div>
          <div className="text-lg">⛰️ {run_total_elevation.toLocaleString('en-US') +' feet'}</div>
          <div className="text-lg">⌛ {run_total_time.toLocaleString('en-US') +' hours'}</div>
        </div>
        
        <div className="text-lg text-center">Progress to running around the earth 🌎</div>  
        <div className="flex rounded-full bg-gray-200">
          <div className="h-5 text-sm text-center text-slate-800 rounded-full bg-green-500 dark:text-slate-900" style={{ width: `${earth_percent_complete}%` }}>{earth_percent_complete}%</div>
          <div className="pl-2 text-sm whitespace-nowrap dark:text-slate-900">{earth_miles_to_go} miles to go!</div>
        </div>
      </div>

      <div className="text-2xl font-bold my-2">Training Blog</div>

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
  const entries = await db.collection('access_tokens').get()
  let [{access_token, refresh_token}] = entries.docs.map(entry => entry.data())
  const resToken = await fetch(
    `https://www.strava.com/api/v3/oauth/token?client_id=${process.env.CLIENT_ID_STRAVA}&client_secret=${process.env.CLIENT_SECRET_STRAVA}&grant_type=refresh_token&refresh_token=${refresh_token}`,
    {
      method: 'POST',
    },
  )
  const {
    access_token: newToken,
    refresh_token: newRefreshToken,
  } = await resToken.json()
  const resStats = await fetch(
    'https://www.strava.com/api/v3/athletes/6689392/stats',
    {
      headers: {
        Authorization: `Bearer ${newToken}`,
      },
    },
  )
  db.collection('access_tokens')
    .doc('W50yW2KWMFL2U0XJGbru')
    .update({
      access_token: newToken,
      refresh_token: newRefreshToken,
    })

  const stravaStats = await resStats.json()

  return {
    props: {
      stravaStats,
      posts: allPosts.map(({ data, content, slug}) => ({
        ...data,
        date: data.date,
        content,
        slug,
      })),
    },
    revalidate: 3600,
  };
}

function BlogPostList({ slug, title, date, content, description}) {
  return (
    <Link href={`/blog/${slug}`}>
      <div className="border-gray-200 border-2 rounded-lg shadow hover:shadow-md hover:border-green-500 p-4 transition duration-300 ease-in-out">
        <div className="font-bold">
          {title}
        </div>
        <div className="text-slate-500 text-sm">{date}</div>
        <div>{description}</div>
      </div>
    </Link>
  )
}

