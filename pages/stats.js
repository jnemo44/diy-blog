import Head from 'next/head';

export default function About() {
  return (
    <div>
      <Head>
        <title>Stats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form className="flex-col space-y-4" action="url" method="post" target="_self">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <div className="mt-1">
              <input
                type="date"
                name="date-start"
                id="date-start"
                className="block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Date Start"
              />
            </div>
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <div className="mt-1">
              <input
                type="date"
                name="date-start"
                id="date-start"
                className="block w-1/2 rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Date Start"
              />
            </div>
            <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
          </div>
        </form>

      </main>

    </div>
  )
}