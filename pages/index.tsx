import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>nerdou</title>
        <meta name="description" content="Conteúdo nerd pra você" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1> nerdou </h1>
      </main>
    </>
  )
}

export default Home
