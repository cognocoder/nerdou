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
import jwt_decode from 'jwt-decode'

interface IFormInput {
	email: string
	password: string
}

function Cancel() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<IFormInput>()

	const { access, save } = useAuthSlice((state) => state.tokens)
	const [button, setButton] = useState('none')
	const router = useRouter()

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		if (button !== 'none') {
			return
		}

		setButton('delete')
		const { id } = jwt_decode<{ id: string }>(access.split(' ').at(-1) || '')
		const url =
			process.env.NEXT_PUBLIC_NERDOU_API_URL || 'http://localhost:6000'
		const res = await fetch(`${url}/accounts/${id}`, {
			method: 'DELETE',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				Authorization: access,
			},
			body: JSON.stringify({ username: data.email, password: data.password }),
		})

		if (res.status === 200) {
			save('', '')
			setTimeout(() => router.push('/cadastrar'), 600)
			setButton('success')
		} else if (res.status === 401) {
			setButton('Credenciais inválidas')
		} else if (res.status === 404) {
			setButton('Conta não encontrada')
		} else {
			setButton('Tente novamente mais tarde')
		}

		return res
	}

	const onClick = () => {
		if (button === 'cancelar') {
			return
		}

		setButton('success')
		setTimeout(() => router.push('/acessar'), 600)
	}

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
				<Button type="submit" background="#941" status={button}>
					excluir conta
					<Loader status={button === 'delete' ? 'pending' : button} />
				</Button>
				{!['delete', 'none', 'success'].includes(button) && <p>{button}</p>}
				<Button
					type="button"
					background="#444"
					margin="18px 0"
					onClick={onClick}
					status={button}
				>
					cancelar
				</Button>
			</Form>
		</>
	)
}

export default Cancel
