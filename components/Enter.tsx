import React, { useEffect, useState } from 'react'

import {
	Background,
	Button,
	Form,
	Input,
	Label,
	Leaves1,
	Leaves2,
	Main,
	Stars,
} from '@/components/Enter.styled'

function Enter() {
	return (
		<>
			<Background />
			<Stars />
			<Leaves1 />
			<Leaves2 />
			<Main>
				<Form>
					<Label>
						<Input type="email" />
						<span>e-mail</span>
					</Label>
					<Label>
						<Input type="password" />
						<span>senha</span>
					</Label>
					<Button type="button">
						<h1>nerdou</h1>
					</Button>
				</Form>
			</Main>
		</>
	)
}

export default Enter
