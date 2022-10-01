import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="../favicon.ico"></link>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@joe_niemiec" />
          <meta name="twitter:title" content="Joe Niemiec" />
          <meta name="twitter:description" content="Exploring the web while running for days" />
          <meta name="twitter:image" content="/joeRunning.JPG" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument