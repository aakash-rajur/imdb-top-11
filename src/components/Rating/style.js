export const pathStyle = {
	path: {
		strokeDasharray: ({length}) => length || 0,
		strokeDashoffset: ({length, percent}) => (length || 0) * (1 - percent),
		transition: ({length, percent}) => !length || !percent ? null : `stroke-dashoffset 0.7s ease-out`,
		visibility: ({visible}) => visible ? 'initial' : 'hidden',
	}
};

export default {
	canvas: {
		transform: 'rotate(-90deg)'
	}
}