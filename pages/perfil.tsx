import type { NextPage } from 'next'
import Head from 'next/head'
import Container from '@/components/Container'
import Background from '@/components/Background'
import useAuthenticated from '@/hooks/Authenticated'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Perfil: NextPage = () => {
	const authenticated = useAuthenticated()

	const router = useRouter()

	useEffect(() => {
		if (!authenticated) {
			setTimeout(() => router.push('/'), 2400)
		}
	})

	return (
		<>
			<Head>
				<title>nerdou</title>
				<meta name="description" content="nerdou" />
			</Head>

			<Background />
			<Container>
				{authenticated ? <h1>Perfil</h1> : <h1>Usuário não autenticado</h1>}
			</Container>
		</>
	)
}

export default Perfil
