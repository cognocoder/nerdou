import React, { useEffect, useState } from 'react'

import {
	Background,
	Button,
	Form,
	Input,
	Label,
	Leaves,
	Main,
	Stars,
} from '@/components/Enter.styled'

function Enter() {
	return (
		<>
			<Stars />
			<Leaves
				duration="10s"
				delay="2s"
				skew="1"
				src="leaves1.png"
				transx="10"
			/>
			<Leaves duration="6s" delay="0s" skew="1" src="leaves2.png" transx="10" />
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
