import React from 'react'
import { useRouter } from 'next/router'

import { useQuery } from '@tanstack/react-query'
import { useAuthenticationSlice as useAuthSlice } from 'hooks/AuthenticationSlice'

import jwt_decode from 'jwt-decode'
import { Button, Header } from './Account.styled'

function Account() {
	const { access, refresh, save } = useAuthSlice((state) => state.tokens)
	const { id } = jwt_decode<{ id: string }>(access.split(' ').at(-1) || '')

	const router = useRouter()
	const url = process.env.NEXT_PUBLIC_NERDOU_API_URL || 'http://localhost:6000'

	async function exit() {
		const options: RequestInit = {
			credentials: 'include',
			method: 'DELETE',
			headers: {
				Authorization: access,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ refresh }),
		}

		const res = fetch(`${url}/authentication`, options)

		save('', '')
		router.push('/')
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
				<h2>{data.username}</h2>
				<p>
					{`#${id}`}
					<br />
					<a href={`mailto:${data.email}`}>{data.email}</a>
				</p>
				{!data.verified && (
					<Button
						type="button"
						background="#444"
						color="#eee"
						padding="12px 32px"
						status="none"
					>
						verificar e-mail
					</Button>
				)}
				<Button
					type="button"
					background="#444"
					color="#eee"
					padding="12px 32px"
					status="none"
					onClick={exit}
				>
					sair
				</Button>
				<Button
					type="button"
					background="#921"
					color="#eee"
					padding="12px 32px"
					status="none"
				>
					deletar conta
				</Button>
			</Header>
		)
	}

	return (
		<>
			<p>{id}</p>
		</>
	)
}

export default Account
