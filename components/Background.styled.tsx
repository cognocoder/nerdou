import styled from 'styled-components'

interface LeavesProps {
	delay: string
	duration: string
	skew: string
	src: string
	transx: string
}

export const Leaves = styled.article<LeavesProps>`
	background-image: url(${(props) => props.src});
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	height: 100vh;
	position: fixed;
	width: 100vw;

	transition: all 0.5s ease;
	transform: scale(1.012);

	animation-name: wind;
	animation-duration: ${(props) => props.duration};
	animation-delay: ${(props) => props.delay};
	animation-iteration-count: infinite;
	animation-timing-function: ease-in-out;

	@keyframes wind {
		0% {
			transform: skewX(${(props) => props.skew}deg)
				translateX(-${(props) => props.transx}px) scale(1.012);
		}
		50% {
			transform: skewX(-${(props) => props.skew}deg)
				translateX(${(props) => props.transx}px) scale(1.008);
		}
		100% {
			transform: skewX(${(props) => props.skew}deg)
				translateX(-${(props) => props.transx}px) scale(1.012);
		}
	}
`

export const Stars = styled.article`
	background-image: url('stars.png');
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	height: 100vh;
	position: fixed;
	width: 100vw;

	animation: shine 3s infinite ease-in-out;

	@keyframes shine {
		0% {
			transform: scale(1);
			filter: blur(20px);
		}
		25% {
			transform: scale(1.0025);
			filter: blur(24px);
		}
		50% {
			transform: scale(1);
			filter: blur(20px);
		}
		75% {
			transform: scale(1.0025);
			filter: blur(20px);
		}
		100% {
			transform: scale(1);
			filter: blur(24px);
		}
	}
`
