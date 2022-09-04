import '../styles/globals.css'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <div className="mx-auto w-9/12">
      <header>
        <h1 className="text-2xl font-bold text-center my-4">Joe's Blog</h1>
        <nav className="my-4">
          <ul className="flex justify-center space-x-4">
            <li>
              <Link href="/"><a>Home</a></Link>
            </li>
            <li>
              <Link href="/about"><a>About</a></Link>
            </li>
          </ul>
        </nav>
      </header>


      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
