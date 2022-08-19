import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { useQuery } from '@tanstack/react-query'
import { useAuthenticationSlice as useAuthSlice } from 'hooks/AuthenticationSlice'

import jwt_decode from 'jwt-decode'
import { Button, Header, Loader } from './Elements.styled'
import Link from 'next/link'

function Account() {
	const { access, refresh, save } = useAuthSlice((state) => state.tokens)
	const { id } = jwt_decode<{ id: string }>(access.split(' ').at(-1) || '')

	const router = useRouter()
	const url = process.env.NEXT_PUBLIC_NERDOU_API_URL || 'http://localhost:6000'

	const [button, setButton] = useState('none')

	async function exit() {
		if (button !== 'none') {
			return
		}

		setButton('exit')
		try {
			const options: RequestInit = {
				credentials: 'include',
				method: 'DELETE',
				headers: {
					Authorization: access,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ refresh }),
			}

			const res = await fetch(`${url}/authentication`, options)

			setButton('none')
			save('', '')
			router.push('/acessar')
		} catch (error) {
			setButton('none')
			console.log(error)
		}
	}

	function cancel() {
		setButton('delete')
		setTimeout(() => router.push('/cancelar'), 600)
	}

	const { status, error, data } = useQuery(['getAccount'], async () => {
		try {
			const options: RequestInit = {
				credentials: 'include',
				headers: { Authorization: access },
			}

			const res = await fetch(`${url}/accounts/${id}`, options)
			const json = await res.json()

			return json
		} catch (error) {
			console.log(JSON.stringify(error))
		}
	})

	if (status === 'success') {
		return (
			<Header>
				<h2>
					<Link href="/perfil">
						<a>{data.username}</a>
					</Link>
				</h2>
				<p>
					{`#${id}`}
					<br />
					<a href={`mailto:${data.email}`}>{data.email}</a>
				</p>
				{!data.verified && (
					<Button
						type="button"
						status={button === 'verify' ? 'loading' : button}
					>
						verificar e-mail
					</Button>
				)}
				<Button
					type="button"
					status={button === 'exit' ? 'loading' : button}
					onClick={exit}
				>
					sair
					<Loader status={button === 'exit' ? 'loading' : button} />
				</Button>
				<Button
					type="button"
					background="#921"
					status={button === 'delete' ? 'loading' : button}
					onClick={cancel}
				>
					excluir conta
				</Button>
			</Header>
		)
	}

	return (
		<Header>
			<p>
				<Loader status={status} size="48px" margin="0 -24px" />
			</p>
		</Header>
	)
}

export default Account
