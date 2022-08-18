import type { NextPage } from 'next'
import Head from 'next/head'
import Container from '@/components/Container'
import Background from '@/components/Background'
import Enter from '@/components/Enter'

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>nerdou</title>
				<meta name="description" content="nerdou" />
			</Head>

			<Background />
			<Container>
				<Enter />
			</Container>
		</>
	)
}

export default Home
