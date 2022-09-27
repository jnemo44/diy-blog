import Head from 'next/head';

export default function About() {
  return (
    <div>
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-green-100">
        <article className="prose">
          <span>Hey! I'm a full time flight test engineer still trying to decide what I want to be when I grow up. Follow along as I share what I'm learning both as an engineer and an athlete!</span>
          <ul>
            <li>Fighting to end slavery. <a href="https://www.gofundme.com/f/elite-racing-benefitting-our?utm_campaign=p_cf+share-flow-1&utm_medium=copy_link&utm_source=customer"> Join the Fight!</a></li>
            <li>Twitter <a href="https://twitter.com/joe_niemiec">@joe_niemiec</a></li>
            <li>GitHub <a href="https://github.com/jnemo44">@jnemo44</a></li>
            <li>Instagram <a href="https://instagram.com/joe.niemiec">@joe.niemiec</a></li>
          </ul>
        </article>
      </main>

    </div>
  )
}