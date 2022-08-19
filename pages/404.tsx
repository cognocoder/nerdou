import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Container from '@/components/Container'
import Background from '@/components/Background'
import { useEffect } from 'react'
import useAuthenticationSlice from '@/hooks/AuthenticationSlice'

const Home: NextPage = () => {
	const { access, refresh } = useAuthenticationSlice((state) => state.tokens)
	const { load } = useAuthenticationSlice((state) => state.tokens)

	const router = useRouter()

	useEffect(() => {
		if ((access.length && refresh.length) || load()) {
			setTimeout(() => router.push('/perfil'), 800)
			return
		}
		setTimeout(() => router.push('/acessar'), 800)
	})

	return (
		<>
			<Head>
				<title>nerdou</title>
				<meta name="description" content="nerdou" />
			</Head>

			<Background />
			<Container />
		</>
	)
}

export default Home
