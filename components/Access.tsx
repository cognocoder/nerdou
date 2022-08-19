import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import {
	Button,
	Form,
	Input,
	Label,
	Loader,
} from '@/components/Elements.styled'
import { useRouter } from 'next/router'
import { useAuthenticationSlice as useAuthSlice } from 'hooks/AuthenticationSlice'

interface IFormInput {
	email: string
	password: string
}

function Access() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<IFormInput>()

	const { access, refresh, save } = useAuthSlice((state) => state.tokens)
	const [button, setButton] = useState('none')
	const router = useRouter()

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		if (button !== 'none') {
			return
		}

		setButton('access')
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
			setButton('success')
		} else if (res.status === 401) {
			setButton('Credenciais inválidas')
		} else {
			setButton('Tente novamente mais tarde')
		}

		return res
	}

	const onClick = () => {
		setButton('success')
		setTimeout(() => router.push('/cadastrar'), 600)
	}

	useEffect(() => {
		if (access.length && refresh.length) {
			setButton('success')
			setTimeout(() => router.push('/perfil'), 600)
		}
	}, [router, access.length, refresh.length])

	return (
		<>
			<Form status={button} onSubmit={handleSubmit(onSubmit)}>
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
				<Button type="submit" background="#c42" status={button}>
					nerdou
					<Loader status={button === 'access' ? 'pending' : button} />
				</Button>
				{!['access', 'none', 'success'].includes(button) && <p>{button}</p>}
				<Button
					type="button"
					background="#346"
					margin="18px 0"
					onClick={onClick}
					status={button}
				>
					cadastro
				</Button>
			</Form>
		</>
	)
}

export default Access
