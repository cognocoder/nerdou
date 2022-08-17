import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import { Button, Form, Input, Label, Loader } from '@/components/Enter.styled'
import { useRouter } from 'next/router'
import { useAuthenticationSlice as useAuthSlice } from 'hooks/AuthenticationSlice'

interface IFormInput {
	email: string
	password: string
}

function Enter() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<IFormInput>()

	const { access, refresh, save } = useAuthSlice((state) => state.tokens)
	const [requestStatus, setRequestStatus] = useState('')
	const router = useRouter()

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		if (['pending', 'success'].includes(requestStatus)) {
			return
		}

		setRequestStatus('pending')
		const url =
			process.env.NEXT_PUBLIC_NERDOU_API_URL || 'http://localhost:6000'
		const res = await fetch(`${url}/authentication`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username: data.email, password: data.password }),
		})

		if (res.status === 200) {
			const { refresh } = await res.json()
			const access = res.headers.get('Authorization') || ''

			save(access, refresh)

			setTimeout(() => router.push('/perfil'), 600)
			setRequestStatus('success')
		} else if (res.status === 401) {
			setRequestStatus('Credenciais inválidas')
		} else {
			setRequestStatus('Tente novamente mais tarde')
		}

		return res
	}

	useEffect(() => {
		if (access.length && refresh.length) {
			setRequestStatus('success')
			setTimeout(() => router.push('/perfil'), 600)
		}
	}, [router, access.length, refresh.length])

	return (
		<>
			<Form status={requestStatus} onSubmit={handleSubmit(onSubmit)}>
				<Label>
					<Input
						type="email"
						{...register('email', {
							pattern: {
								message: ' · valor inválido',
								value:
									/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
							},
							required: ' · campo obrigatório',
						})}
					/>
					<p>e-mail{errors.email?.message}</p>
				</Label>
				<Label>
					<Input
						type="password"
						{...register('password', {
							pattern: {
								message: ' · valor inválido',
								value: /^.{8,}$/,
							},
							required: ' · campo obrigatório',
						})}
					/>
					<p>senha{errors.password?.message}</p>
				</Label>
				<Button type="submit" status={requestStatus}>
					nerdou
					<Loader status={requestStatus} />
				</Button>
				{!['pending', 'success'].includes(requestStatus) && (
					<p>{requestStatus}</p>
				)}
			</Form>
		</>
	)
}

export default Enter
