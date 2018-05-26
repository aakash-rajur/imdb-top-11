import PropTypes from 'prop-types';
import React from 'react';

export default function Dot({color = "#fff", className}) {
	return (
		<svg viewBox="0 0 1024 1024" width='10px' height="10px" className={className}>
			<circle cx="512" cy="512" r="480" fill={color} stroke={color}/>
		</svg>
	)
}

Dot.propTypes = {
	color: PropTypes.string,
	className: PropTypes.string
};