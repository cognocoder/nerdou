import type { NextPage } from 'next'
import Head from 'next/head'
import Container from '@/components/Container'
import Background from '@/components/Background'
import Access from '@/components/Access'

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>nerdou</title>
				<meta name="description" content="nerdou" />
			</Head>

			<Background />
			<Container>
				<Access />
			</Container>
		</>
	)
}

export default Home
