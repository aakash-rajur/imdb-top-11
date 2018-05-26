import {COLLAPSE} from "../../utils/constants";

export const backgroundStyle = {
	'@keyframes background-scroll-down': {
		from: {
			transform: 'translateY(-5%)'
		},
		to: {
			transform: 'translateY(5%)'
		}
	},
	'@keyframes background-scroll-up': {
		from: {
			transform: 'translateY(5%)'
		},
		to: {
			transform: 'translateY(-5%)'
		}
	},
	
	translating: {
		position: 'absolute',
		width: '100%',
		height: '120%',
		top: '-10%',
		left: 0,
		animation: ({state}) =>
			`background-scroll-${
				state === COLLAPSE ? 'up' : 'down'
				} 0.7s both`
	},
	blur: {
		filter: ({state}) =>
			`blur(8px) saturate(50%) grayscale(${
				state === COLLAPSE ? '0' : '100'
				}%)`,
		transition: '0.7s all'
	}
};