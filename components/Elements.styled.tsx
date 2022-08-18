import styled from 'styled-components'

interface IBox {
	margin?: string
	padding?: string
	size?: string
}
interface IColor {
	background?: string
	color?: string
}

interface IStatus {
	status: string
}

interface IOptionsProperties extends IBox, IColor, Partial<IStatus> {}

export const Button = styled.button<IOptionsProperties>`
	background-color: ${(props) => props.background || '#444'};
	color: ${(props) => props.color || '#eee'};

	border: none;
	border-radius: 8px;
	box-shadow: 0 7px 12px #2226;
	cursor: ${(props) => (props.status !== 'none' ? 'wait' : 'pointer')};
	font-size: 18px;
	font-weight: bold;
	opacity: 1;
	padding: ${(props) => props.padding || '12px 36px'};
	width: 320px;

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

	@media only screen and (min-width: 768px) {
		width: auto;
		opacity: 0.8;
	}
`

export const Form = styled.form<IStatus>`
	display: flex;
	flex-direction: column;
	padding: 32px 24px;
	transition: all 0.2s;
	width: 360px;
	opacity: ${(props) => (props.status === 'success' ? 0 : 1)};
	transition: all 0.5s;

	& p {
		font-style: italic;
		user-select: none;
		margin-block-start: 12px;
		padding-inline: 8px;
	}

	& button + p {
		font-size: 18px;
		opacity: ${(props) =>
			['pending', 'success'].includes(props.status) ? 0 : 1};
		text-align: center;
		transition: all 1s;
	}
`
export const Loader = styled.span<IOptionsProperties>`
	display: inline-block;
	border-top: 3px solid ${(props) => props.color || '#eee'};
	border-radius: 50%;
	border-right: 3px solid transparent;
	height: ${(props) => props.size || '12px'};
	margin: ${(props) => props.margin || '6px 8px'};
	opacity: ${(props) =>
		['loading', 'pending'].includes(props.status || '') ? 1 : 0};
	padding: ${(props) => props.padding || '0'};
	position: absolute;
	transition: all 0.5s;
	width: ${(props) => props.size || '12px'};

	animation: rotation 1s linear infinite;

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
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
		text-align: center;
		margin: 0;
	}

	& p a {
		color: #eeea;
	}

	& p a:hover {
		color: #eee;
	}

	@media only screen and (min-width: 768px) {
		& p {
			text-align: left;
		}
	}
`
