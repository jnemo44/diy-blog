import '../styles/globals.css'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import useDarkMode from "../components/useDarkMode";

function MyApp({ Component, pageProps, test }) {
  const [colorTheme, setTheme] = useDarkMode();
  let currentDate = Date.now()
  let raceDate = new Date("12/4/2022")
  return (
    <div className="mx-auto w-8/12 font-Poppins">
      <header className='flex w-full justify-between space-x-4'>
        <Link href="/"><a className="text-2xl font-bold my-4 whitespace-nowrap">Joe Niemiec</a></Link>
        <div className="hidden sm:flex place-self-center whitespace-nowrap">Next race: {Math.round((raceDate - currentDate) / (1000 * 3600 * 24))} days </div>
        <nav className="place-self-center pr-2">
          <div className="flex space-x-2 sm:space-x-4 font-bold">
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
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
