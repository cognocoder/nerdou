import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import create from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { Button, Form, Input, Label } from '@/components/Enter.styled'

interface IFormInput {
	email: string
	password: string
}
interface IAuthenticationState {
	access: string
	refresh: string
	create: (access: string, refresh: string) => void
}

const useAuthenticationStore = create<IAuthenticationState>()(
	immer((set) => ({
		access: '',
		refresh: '',
		create: (access, refresh) =>
			set((state) => {
				state.access = access
				state.refresh = refresh
			}),
	}))
)

function Enter() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<IFormInput>()

	const create = useAuthenticationStore((state) => state.create)
	const access = useAuthenticationStore((state) => state.access)
	const refresh = useAuthenticationStore((state) => state.refresh)

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
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
			create(access, refresh)
			console.log({ access, refresh })
		}

		return res
	}

	return (
		<>
			<Form onSubmit={handleSubmit(onSubmit)}>
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
				<Button type="submit" value="nerdou" />
			</Form>
		</>
	)
}

export default Enter
