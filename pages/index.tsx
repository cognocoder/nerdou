import type { NextPage } from 'next'
import Head from 'next/head'
import Enter from '@/components/Enter'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>nerdou</title>
        <meta name="description" content="nerdou" />
      </Head>

      <Enter />
    </>
  )
}

export default Home
