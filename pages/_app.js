import '../styles/globals.css'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import useDarkMode from "../components/useDarkMode";
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps}) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  const [colorTheme, setTheme] = useDarkMode();
  let currentDate = Date.now()
  let raceDate = new Date("1/15/2023")
  return (
    <div className="mx-auto w-10/12 sm:w-8/12 font-Poppins">
      <header className='flex w-full justify-between space-x-4'>
        <Link href="/"><a className="text-2xl font-bold my-4 whitespace-nowrap">Joe Niemiec</a></Link>
        {/* <div className="hidden font-bold sm:flex place-self-center whitespace-nowrap">Next race: {Math.round((raceDate - currentDate) / (1000 * 3600 * 24))} days </div> */}
        <a href="https://www.lelliweather.app/" className="hidden font-bold sm:flex place-self-center whitespace-nowrap" target="_blank" rel="noopener noreferrer">Add weather to Strava runs</a>
        <nav className="place-self-center pr-2">
          <div className="flex space-x-4 font-bold">
            <Link href="/"><a>Home</a></Link>
            <Link href="/about"><a>About</a></Link>

            {/* <Link href="/stats"><a>Stats</a></Link> */}
            {colorTheme === "light" ? (
              <SunIcon className="h-6 w-6 place-self-center outline outline-offset-4 rounded" onClick={() => setTheme("light")} />)
              :
              (
                <MoonIcon className="h-6 w-6 place-self-center outline outline-offset-4 rounded" onClick={() => setTheme("dark")}></MoonIcon>
              )}
          </div>
        </nav>
      </header>
      <>
      <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
        <Component {...pageProps} />
        <Analytics />
      </SessionContextProvider>
      </>
    </div>
  )
}

export default MyApp
