import React from 'react'
import { Leaves, Stars } from './Background.styled'

function Background() {
	return (
		<>
			<Stars />
			<Leaves duration="9s" delay="2s" skew=".5" src="leaves1.png" transx="5" />
			<Leaves duration="6s" delay="0s" skew=".5" src="leaves2.png" transx="5" />
		</>
	)
}

export default Background
