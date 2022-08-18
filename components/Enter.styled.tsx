import styled from 'styled-components'

export const Input = styled.input`
	background: none;
	border: 1px solid #eee0;
	border-bottom: 1px solid #eee2;
	color: #eee;
	display: block;
	font-size: 18px;
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
`
