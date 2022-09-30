import Head from 'next/head';

export default function About() {
  return (
    <div>
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="font-bold text-xl text-center border-b-2 border-green-500 mb-2">Dad 👨‍👩‍👧‍👦 Runner 🏃 Engineer 🤓 </h1>
      <main className="flex justify-center shrink">
        
        <article className="prose dark:prose-invert">
          <p>Hey! I'm Joe. A little about me...</p>
            <ul>
              <li>I like snowleopards</li>
              <li className="text-green-500">Tailwinds green-500 color</li>
              <li className="font-bold"> Dark mode is a required part of an MVP website</li>
            </ul>
          <div>
            I'm currently a full time flight test engineer that's still trying to decide what I want to be when I grow up. Follow along as I share what I'm learning both as an engineer and an athlete!
          </div>
          <p>
            Oh and about the stats card. I started uploading runs to Strava in 2014 after I graduated from college. So the total miles number
            does not include anything from my time as a runner in highschool or college where I was a division ✌ XC and track runner. And I like it that way. I want to show people that awesome fitness can carry on long after school, a job, marriage, and possibly even 4 kids!
            </p>

          <div className="font-bold text-xl">The Linkages </div>
          
          <ul>
            <li>Fighting to end slavery. <a href="https://www.gofundme.com/f/elite-racing-benefitting-our?utm_campaign=p_cf+share-flow-1&utm_medium=copy_link&utm_source=customer"> Join the Fight!</a></li>
            <li>Twitter <a href="https://twitter.com/joe_niemiec">@joe_niemiec</a></li>
            <li>GitHub <a href="https://github.com/jnemo44">@jnemo44</a></li>
            <li>Instagram <a href="https://instagram.com/joe.niemiec">@joe.niemiec</a></li>
            <li>Strava <a href="https://www.strava.com/athletes/6689392">Joe Niemiec</a></li>
          </ul>
        </article>
      </main>

    </div>
  )
}