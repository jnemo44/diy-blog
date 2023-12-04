import Head from 'next/head';

export default function About() {
  return (
    <div>
      <Head>
        <title>About</title>
        <link rel="icon" href="../favicon.ico" />
      </Head>
      <div className="flex space-x-4 font-bold text-base md:text-lg justify-center border-b-2 border-green-500 mb-2">
        <div className="">Dad 👨‍👩‍👧‍👦</div>
        <div className="">Runner 🏃</div>
        <div className="">Engineer 🤓</div>
      </div>

      <main className="flex justify-center shrink">

        <article className="prose dark:prose-invert">
          <p>{"Hi! I'm Joe."}</p>

          <p>
            {"I love running and enjoy building things online so this is my space to combine 🏃‍♂️ ➕ 💻. I use this blog as a journal to help me process my running so it's pretty raw and unbeautiful."}
          </p>
          <p>
            {/* {"Follow along as I test web development ideas and write about the glamorous life of a semi-pro runner!"} */}
            {"After qualifying in 2020 for the US Olympic Marathon Trials (2:17:15) I was training to qualify again for the 2024 trials (sub 2:18), but fell short after three attempts. Along the way I represented an awesome organization called Operation Underground Railroad in their fight to end slavery! "}
            {"If you'd like to support me in this goal checkout the link below!"}
          </p>

          <p className="flex justify-center">
          <div className="font-bold text-xl"><a href="https://www.gofundme.com/f/elite-racing-benefitting-our?utm_campaign=p_cf+share-flow-1&utm_medium=copy_link&utm_source=customer"> Join the Fight!</a></div>
          </p>

          <p>
            {"I've also recently launched LelliWeather which is quick way to have weather details added to every outdoor Strava activity that you upload. Free for 90 days. Check it out!"}
          </p>
          <p className="flex justify-center">
            <div className="font-bold text-xl"><a href="https://www.lelliweather.app/"> Add weather to Strava activities</a></div>
          </p>

          <p>
            {"Oh and about the stats card on the home page. I started uploading runs to Strava in 2014 after I graduated from college. So the total miles number"}
            {"does not include anything from my time as a runner in highschool or college where I was a division ✌ XC and track runner. And I like it that way. I want to show people that awesome fitness can carry on long after school, a job, marriage, and possibly even 4 kids!"}
          </p>

          <div className="font-bold text-xl">Follow Along 🔗</div>
          <ul>
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