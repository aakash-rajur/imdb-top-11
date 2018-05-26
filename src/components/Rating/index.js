import PropTypes from 'prop-types';
import React, {Component} from 'react';
import injectSheet from 'react-jss';
import {setStatePromise} from "../../utils";
import style, {pathStyle} from './style';

const pathPropTypes = {
	length: PropTypes.number,
	percent: PropTypes.number,
	visible: PropTypes.bool,
	innerRef: PropTypes.func
};

const pathDefaultProps = {
	length: null,
	percent: 0,
	animate: false,
	visible: false
};

const RottenTomatoes = injectSheet(pathStyle)(
	function ({classes, pathRef}) {
		return (
			<path
				strokeMiterlimit="10" fill="none" strokeWidth="60px" stroke="#7fffaa"
				d="M938,512c0,235.27-190.73,426-426,426S86,747.27,86,512,276.73,86,512,86,938,276.73,938,512Z"
				strokeLinecap='round' className={classes.path} ref={pathRef}/>
		)
	}
);

RottenTomatoes.propTypes = pathPropTypes;
RottenTomatoes.defaultProps = pathDefaultProps;

const Metacritics = injectSheet(pathStyle)(
	function ({classes, pathRef}) {
		return (
			<path
				strokeMiterlimit="10" fill="none" strokeWidth="70px" stroke="#1976D2"
				d="M873,512c0,199.37-161.63,361-361,361S151,711.37,151,512,312.63,151,512,151,873,312.63,873,512Z"
				strokeLinecap='round' className={classes.path} ref={pathRef}/>
		);
	}
);

Metacritics.propTypes = pathPropTypes;
Metacritics.defaultProps = pathDefaultProps;

class Rating extends Component {
	static propTypes = {
		rottenTomatoes: PropTypes.number,
		metacritics: PropTypes.number
	};
	
	static defaultProps = {
		rottenTomatoes: 0,
		metacritics: 0
	};
	
	constructor(props) {
		super(props);
		this.measureLength = this.measureLength.bind(this);
		this.state = {
			rtLength: null,
			rtVisible: true,
			rtValue: props.rottenTomatoes,
			mcLength: null,
			mcVisible: true,
			mcValue: props.metacritics,
			animate: false
		};
	}
	
	async componentDidUpdate(props) {
		if (props.rottenTomatoes !== this.props.rottenTomatoes ||
			props.metacritics !== this.props.metacritics) {
			let setState = setStatePromise(this);
			await setState({rtVisible: false, rtValue: 0, mcVisible: false, mcValue: 0});
			await setState({rtVisible: true, rtValue: this.props.rottenTomatoes, mcVisible: true, mcValue: this.props.metacritics})
		}
	}
	
	render() {
		let {
			className = '',
			classes
		} = this.props, {
			rtVisible,
			rtLength,
			rtValue,
			mcVisible,
			mcLength,
			mcValue
		} = this.state;
		return (
			<svg viewBox="0 0 1024 1024" className={[classes.canvas, className].join(' ')}>
				<circle cx="512" cy="512" r="480" fill="#333" stroke="#333" opacity="0.7"/>
				<RottenTomatoes
					pathRef={this.measureLength('rtLength')}
					length={rtLength} visible={rtVisible} percent={rtValue}/>
				<Metacritics
					pathRef={this.measureLength('mcLength')}
					length={mcLength} visible={mcVisible} percent={mcValue}/>
			</svg>
		)
	}
	
	measureLength(property) {
		return node => {
			if (!node) return;
			let length = node.getTotalLength(),
				{[property]: prev} = this.state;
			prev !== length && this.setState({[property]: length});
		}
	}
}

export default injectSheet(style)(Rating);