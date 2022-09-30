import Head from 'next/head';

export default function About() {
  return (
    <div>
      <Head>
        <title>About</title>
        <link rel="icon" href="../favicon.ico" />
      </Head>
      <div className="flex space-x-4 font-bold text-xl justify-center border-b-2 border-green-500 mb-2">
        <div className="">Dad 👨‍👩‍👧‍👦  </div>
        <div className="">Runner 🏃</div>
        <div className="">Engineer 🤓</div>
      </div>

      <main className="flex justify-center shrink">

        <article className="prose dark:prose-invert">
          <p>Hi! I'm Joe.</p>

          <p>
            I'm currently a full time flight test engineer 🛩️ that's still trying to decide what I want to be when I grow up 🧙. I'm a decent runner and I enjoy building things online so this is my space to combine these two pursuits.
          </p>
          <p> 
            Follow along as I test web development ideas and share some of my training as a runner!   
          </p>

          <p>
            Oh and about the stats card on the home page. I started uploading runs to Strava in 2014 after I graduated from college. So the total miles number
            does not include anything from my time as a runner in highschool or college where I was a division ✌ XC and track runner. And I like it that way. I want to show people that awesome fitness can carry on long after school, a job, marriage, and possibly even 4 kids!
          </p>

          <div className="font-bold text-xl">The Linkages</div>

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