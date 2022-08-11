import styled from 'styled-components'

export const Button = styled.button`
	background-color: #c42;
	border: none;
	border-radius: 8px;
	box-shadow: 0 7px 12px #2226;
	color: #eee;
	cursor: pointer;
	font-size: 18px;
	margin: 24px 0;
	transition: all 0.1s ease-out;
	width: 100%;

	&:hover {
		box-shadow: 0 8px 12px #2228;
		transform: translateY(2px);
	}

	&:active {
		box-shadow: 0 4px 10px #222d;
		transform: translateY(5px);
	}
`

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 24px;
	margin: 16vh 0;
	padding: 32px 24px;
	transition: all 0.2s;
	width: 360px;
`

export const Input = styled.input`
	background: none;
	border: 1px solid #eee0;
	border-bottom: 1px solid #eee2;
	color: #eee;
	display: block;
	font-size: 24px;
	padding: 12px 4px;
	transition: 0.25s;
	width: 100%;

	&:hover {
		border-bottom: 1px solid #eee8;
	}

	&:focus {
		border-bottom: 1px solid #eeef;
		outline: none;
	}
`

export const Label = styled.label`
	cursor: pointer;
	opacity: 0.8;

	&:hover,
	&:focus {
		opacity: 1;
	}

	& span {
		display: block;
		font-style: italic;
		user-select: none;
		padding: 4px 8px;
	}
`

export const Main = styled.main`
	justify-content: center;
	display: flex;
	height: 100vh;
	margin: auto;
	position: absolute;
	width: 100vw;
`

export const Background = styled.article`
	background-image: url('bg.jpg');
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	height: 100vh;
	position: fixed;
	width: 100vw;
`

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

	animation-name: wind;
	animation-duration: ${(props) => props.duration};
	animation-delay: ${(props) => props.delay};
	animation-iteration-count: infinite;
	animation-timing-function: ease-in-out;

	@keyframes wind {
		0% {
			transform: skewX(${(props) => props.skew}deg)
				translateX(-${(props) => props.transx}px) scale(1.2);
		}
		50% {
			transform: skewX(-${(props) => props.skew}deg)
				translateX(${(props) => props.transx}px) scale(1.2);
		}
		100% {
			transform: skewX(${(props) => props.skew}deg)
				translateX(-${(props) => props.transx}px) scale(1.2);
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
			filter: blur(10px);
		}
		25% {
			transform: scale(1.0025);
			filter: blur(12px);
		}
		50% {
			transform: scale(1);
			filter: blur(10px);
		}
		75% {
			transform: scale(1.0025);
			filter: blur(10px);
		}
		100% {
			transform: scale(1);
			filter: blur(12px);
		}
	}
`
