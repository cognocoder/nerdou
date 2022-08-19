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
	passhash: string
	username: string
}

function Register() {
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

		setButton('register')
		const url =
			process.env.NEXT_PUBLIC_NERDOU_API_URL || 'http://localhost:6000'
		const res = await fetch(`${url}/accounts`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: data.email,
				passhash: data.passhash,
				username: data.username,
			}),
		})

		if (res.status === 201) {
			const auth = await fetch(`${url}/authentication`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username: data.email, password: data.passhash }),
			})

			if (auth.status == 200) {
				const { refresh } = await auth.json()
				const access = auth.headers.get('Authorization') || ''

				save(access, refresh)

				setButton('success')
				setTimeout(() => router.push('/perfil'), 600)
			} else if (auth.status === 401) {
				setButton('Credenciais inválidas')
			} else {
				setButton('Tente novamente mais tarde')
			}
		} else if (res.status === 400) {
			setButton('E-mail já cadastrado')
		} else {
			setButton('Tente novamente mais tarde')
		}

		return res
	}

	const onClick = () => {
		setButton('success')
		setTimeout(() => router.push('/acessar'), 600)
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
						{...register('passhash', {
							pattern: {
								message: ' · valor inválido',
								value: /^.{8,}$/,
							},
							required: ' · campo obrigatório',
						})}
					/>
					<p>senha{errors.passhash?.message}</p>
				</Label>
				<Label>
					<Input
						type="text"
						{...register('username', {
							pattern: {
								message: ' · valor inválido',
								value: /^.{2,}$/,
							},
							required: ' · campo obrigatório',
						})}
					/>
					<p>nome de uruário{errors.username?.message}</p>
				</Label>
				<Button type="submit" background="#c42" status={button}>
					cadastro nerdou
					<Loader status={button === 'register' ? 'pending' : button} />
				</Button>
				<Button
					type="button"
					background="#346"
					margin="18px 0"
					onClick={onClick}
					status={button}
				>
					acessar
				</Button>
				{!['register', 'none', 'success'].includes(button) && <p>{button}</p>}
			</Form>
		</>
	)
}

export default Register
