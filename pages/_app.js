import '../styles/globals.css'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  let currentDate = Date.now()
  let raceDate = new Date("12/4/2022")
  console.log()
  return (
    <div className="dark:bg-slate-900 dark:text-slate-200 h-screen bg-scroll">
      <div className="mx-auto w-8/12 font-Poppins">
        <header className='flex w-full justify-between space-x-4'>
          <Link href="/"><a className="bg-green-100 text-2xl font-bold my-4">Joe Niemiec</a></Link>
          <div className="bg-green-100 place-self-center">Day's till next race: {Math.round((raceDate-currentDate)/ (1000 * 3600 * 24))} </div>
          <nav className="my-4">
            <div className="bg-green-100 flex space-x-2 mt-1 font-bold">
                <Link href="/"><a>Home</a></Link>
                <Link href="/about"><a>About</a></Link>
                <Link href="/stats"><a>Stats</a></Link>
            </div>
          </nav>
        </header>

      <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
