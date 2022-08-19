import type { NextPage } from 'next'
import Head from 'next/head'
import Container from '@/components/Container'
import Background from '@/components/Background'
import Cancel from '@/components/Cancel'

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>nerdou</title>
				<meta name="description" content="nerdou" />
			</Head>

			<Background />
			<Container>
				<Cancel />
			</Container>
		</>
	)
}

export default Home
