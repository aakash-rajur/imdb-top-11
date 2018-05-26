import PropTypes from 'prop-types';
import React, {Component} from 'react';
import injectSheet from 'react-jss';
import {animateGalleryScroll, promiseTimeout, setStatePromise} from "../../../utils";
import {COLLAPSE, EXPAND} from "../../../utils/constants";
import style, {LEFT, NONE, RIGHT, selectedImage} from './style';

function getRelativeX({target, touches}) {
	return (touches[0].clientX - target.getBoundingClientRect().left) / target.clientWidth;
}

const Tiltable = injectSheet(selectedImage)(
	function (props) {
		let {
			alt, src, classes, className,
			onTouchStart, onTouchEnd,
			onTouchMove
		} = props;
		return (
			<img src={src} alt={alt}
			     className={[classes.tiltable, className].join('')}
			     onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
			     onTouchMove={onTouchMove}/>
		)
	}
);

class ImageSwitcher extends Component {
	static propTypes = {
		movies: PropTypes.array,
		index: PropTypes.number,
		className: PropTypes.string,
		onScroll: PropTypes.func,
		state: PropTypes.string
	};
	
	static defaultProps = {
		movies: [],
		index: 0
	};
	
	constructor(props) {
		super(props);
		this.container = null;
		this.renderPoster = this.renderPoster.bind(this);
		this.onMount = this.onMount.bind(this);
		this.toggleTiltState = this.toggleTiltState.bind(this);
		this.onTouchEnd = this.onTouchEnd.bind(this);
		this.hasContainerMounted = false;
		this.state = {
			translate: null,
			tilt: NONE
		};
	}
	
	render() {
		let {
			className,
			movies,
			index,
			classes
		} = this.props;
		return (
			<div className={[classes.container, className].join(' ')}
			     ref={this.onMount}>
				{movies.map(this.renderPoster(index))}
			</div>
		)
	}
	
	async componentDidUpdate(props) {
		if (props.state !== this.props.state) {
			let setState = setStatePromise(this), {
					state,
					classes: {
						translateUp,
						translateDown,
						translated
					}
				} = this.props,
				before = {}, after = {};
			if (state === EXPAND) {
				before = {translate: translateUp};
				after = {translate: translated};
			} else {
				before = {translate: translateDown};
				after = {translate: null};
			}
			await setState(before);
			await promiseTimeout(setState, 500, after);
		}
		if (props.index !== this.props.index && this.container) {
			let next = this.container.children[this.props.index],
				{clientWidth} = this.container,
				vector = next.offsetLeft - 0.1 * clientWidth;
			if (vector) await animateGalleryScroll(this.container, 300, vector);
		}
	}
	
	renderPoster(selected) {
		return ({mobile: src, Title: alt}, index) => {
			let {classes} = this.props,
				{translate} = this.state,
				imageProps = {src, alt},
				className = classes.movie,
				child = <img {...imageProps}/>;
			if (index === selected) {
				className = translate || classes.movie;
				child = (
					<Tiltable {...imageProps}
					          tilt={this.state.tilt}
					          onTouchStart={this.toggleTiltState}
					          onTouchEnd={this.onTouchEnd}
					          onTouchMove={this.toggleTiltState}/>
				);
			}
			return (
				<div className={className}
				     data-index={index} key={index}>
					{child}
				</div>
			);
		}
	}
	
	onMount(node) {
		this.container = node;
		if (this.hasContainerMounted) return;
		this.hasContainerMounted = true;
		let {
			index,
			movies: {
				length
			}
		} = this.props, {
			children,
			clientWidth
		} = this.container;
		if (index > 0 && index < length) {
			this.container.scrollLeft = children[index].offsetLeft - 0.1 * clientWidth;
		}
	}
	
	async onTouchEnd() {
		let {onScroll} = this.props,
			{tilt} = this.state,
			setState = setStatePromise(this);
		await setState({tilt: NONE});
		onScroll && onScroll(tilt === RIGHT ? 100 : -100);
	}
	
	toggleTiltState(e) {
		let rX = getRelativeX(e),
			{tilt} = this.state,
			{state} = this.props;
		if (state !== COLLAPSE) return;
		if (rX < 0.25) tilt !== LEFT && this.setState({tilt: LEFT});
		else if (rX > 0.75) tilt !== RIGHT && this.setState({tilt: RIGHT});
		else if (tilt !== NONE) this.setState({tilt: NONE});
	}
}

export default injectSheet(style)(ImageSwitcher);