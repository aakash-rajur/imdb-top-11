import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import injectSheet from 'react-jss';
import {getInfoTemplate} from "../../../utils/index";

const style = {
	key: {
		justifySelf: 'start'
	},
	value: {
		justifySelf: 'start'
	}
};

function Info({classes, movie}) {
	return (
		<Fragment>
			{getInfoTemplate(movie).reduce((acc, {key, value}, i) => [
				...acc,
				<div className={classes.key} key={`key-${i}`}>{key}</div>,
				<div className={classes.value} key={`value-${i}`}>{value}</div>,
			], [])}
		</Fragment>
	)
}

Info.propTypes = {
	movie: PropTypes.object
};

export default injectSheet(style)(Info)