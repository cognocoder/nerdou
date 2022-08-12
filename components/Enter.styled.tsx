import styled from 'styled-components'

export const Button = styled.input`
	background-color: #c42;
	border: none;
	border-radius: 8px;
	box-shadow: 0 7px 12px #2226;
	color: #eee;
	cursor: pointer;
	font-size: 36px;
	font-weight: bold;
	margin: 48px 0;
	padding: 12px;
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

	& p {
		font-style: italic;
		user-select: none;
		margin-block-start: 12px;
		padding-inline: 8px;
	}
`
