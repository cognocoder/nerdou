import styled from 'styled-components'

interface IBox {
	padding?: string
}
interface IColor {
	background?: string
	color?: string
}

interface IStatus {
	status?: string
}

interface IOptionsProps extends IBox, IColor, IStatus {}

export const Button = styled.button<IOptionsProps>`
	background-color: ${(props) => props.background};
	color: ${(props) => props.color};

	border: none;
	border-radius: 8px;
	box-shadow: 0 7px 12px #2226;
	cursor: ${(props) =>
		['pending', 'finished'].includes(props.status || '') ? 'wait' : 'pointer'};
	font-size: 18px;
	font-weight: bold;
	opacity: 0.75;
	padding: ${(props) => props.padding};
	transition: all 0.1s ease;

	&:hover {
		box-shadow: 0 8px 12px #2228;
		opacity: 1;
		transform: translateY(2px);
	}

	&:active {
		box-shadow: 0 4px 10px #222d;
		transform: translateY(5px);
	}
`

export const Header = styled.header`
	align-items: center;
	display: flex;
	flex-wrap: wrap;
	gap: 12px 32px;
	justify-content: center;
	padding: 36px 24px;
	max-width: 900px;
	user-select: none;

	& h2 {
		margin: 0;
	}

	& p {
		color: #eee6;
		font-size: 14px;
		font-style: italic;
		font-weight: bold;
		margin: 0;
	}

	& p a {
		color: #eeea;
	}

	& p a:hover {
		color: #eee;
	}
`
