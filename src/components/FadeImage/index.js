import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import injectSheet from 'react-jss';
import wallE from '../../assets/wall-e.bk.jpg';
import {promiseTimeout, setStatePromise} from "../../utils";
import style from './style';

const AnimatedImages = injectSheet(style)(
	function ({classes, next, prev, className}) {
		return (
			<Fragment>
				<img className={[classes.prev, className].join(' ')} src={prev} alt="background"/>
				<img className={[classes.next, className].join(' ')} src={next} alt="background"/>
			</Fragment>
		)
	}
);

class Background extends Component {
	static propTypes = {
		src: PropTypes.string,
		className: PropTypes.string,
		imageClassName: PropTypes.string
	};
	
	static defaultProps = {
		src: wallE
	};
	
	constructor(props) {
		super(props);
		this.state = {
			prev: props.src || wallE,
			next: props.src || wallE,
			animating: true
		};
	}
	
	async componentDidUpdate(props) {
		if (props.src !== this.props.src) {
			let setState = setStatePromise(this);
			await setState({next: this.props.src, animating: true});
			await promiseTimeout(setState, 300, {animating: false, prev: this.props.src});
		}
	}
	
	render() {
		let {
			classes,
			className,
			imageClassName
		} = this.props;
		return (
			<div className={[classes.container,className].join(' ')}>
				<AnimatedImages {...this.state} className={imageClassName}/>
			</div>
		)
	}
}

export default injectSheet(style)(Background);