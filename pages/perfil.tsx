import type { NextPage } from 'next'
import Head from 'next/head'
import Container from '@/components/Container'
import Background from '@/components/Background'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Account from '@/components/Account'
import useAuthenticationSlice from '@/hooks/AuthenticationSlice'

const Perfil: NextPage = () => {
	const router = useRouter()

	const { access, load, refresh, save } = useAuthenticationSlice(
		(state) => state.tokens
	)

	useEffect(() => {
		if ((access.length && refresh.length) || load()) {
			return
		}
		setTimeout(() => router.push('/acesso'), 800)
	})

	return (
		<>
			<Head>
				<title>nerdou</title>
				<meta name="description" content="nerdou" />
			</Head>

			<Background />
			<Container>
				{access.length && refresh.length ? <Account /> : <></>}
			</Container>
		</>
	)
}

export default Perfil
