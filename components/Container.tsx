import React from 'react'

import { Main } from '@/components/Container.styled'

interface IContent {
	children?: JSX.Element
}

function Container(props: IContent) {
	return (
		<>
			<Main>{props.children}</Main>
		</>
	)
}

export default Container
