import PropTypes from 'prop-types';
import React from 'react';
import injectSheet from 'react-jss';
import {getInfoTemplate} from "../../../utils/index";

const style = {
	info: {
		display: 'grid',
		gridTemplate: 'auto/40% 1fr',
		gridGap: '8px',
		justifyContent: 'start',
		fontSize: '2vmin',
		overflow: 'auto'
	}
};

function Info({classes, className = '', movie}) {
	return (
		<div className={[classes.info, className].join(' ')}
		     onWheel={e => e.stopPropagation()}>
			{getInfoTemplate(movie).reduce((acc, {key, value}, i) => [
				...acc,
				<div key={`key-${i}`}>{key}</div>,
				<div key={`value-${i}`}>{value}</div>,
			], [])}
		</div>
	)
}

Info.propTypes = {
	movie: PropTypes.object
};

export default injectSheet(style)(Info)