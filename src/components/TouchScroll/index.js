import PropTypes from 'prop-types';
import React, {Component} from 'react';

function getAngle(x1, y1, x2, y2) {
	let angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
	return angle < 0 ? -angle : 360 - angle;
}

class TouchScroll extends Component {
	static propTypes = {
		onScroll: PropTypes.func,
		onSwipeUp: PropTypes.func,
		onSwipeDown: PropTypes.func,
		onSwipeLeft: PropTypes.func,
		onSwipeRight: PropTypes.func,
		threshold: PropTypes.number,
		className: PropTypes.string
	};
	
	constructor(props) {
		super(props);
		this.onTouchStart = this.onTouchStart.bind(this);
		this.onTouchEnd = this.onTouchEnd.bind(this);
	}
	
	render() {
		let {
			className,
			children,
			onScroll
		} = this.props;
		return (
			<div className={className}
			     onTouchStart={this.onTouchStart}
			     onTouchEnd={this.onTouchEnd}
			     onWheel={onScroll}>
				{children}
			</div>
		);
	}
	
	onTouchStart({changedTouches: [touch]}) {
		let {clientX: x, clientY: y} = touch;
		this.start = {x, y};
	}
	
	onTouchEnd({changedTouches: [touch]}) {
		if (!this.start) return;
		let {clientX: x, clientY: y} = touch,
			{threshold = 15} = this.props,
			angle = getAngle(this.start.x, this.start.y, x, y);
		if (angle < (threshold) && angle > -threshold) {
			let {onSwipeLeft} = this.props;
			return onSwipeLeft && onSwipeLeft();
		}
		if (angle < (180 + threshold) && angle > (180 - threshold)) {
			let {onSwipeRight} = this.props;
			return onSwipeRight && onSwipeRight();
		}
		if (angle < (90 + threshold) && angle > (90 - threshold)) {
			let {onSwipeUp} = this.props;
			onSwipeUp && onSwipeUp();
		}
		if (angle < (270 + threshold) && angle > (270 - threshold)) {
			let {onSwipeDown} = this.props;
			onSwipeDown && onSwipeDown();
		}
	}
}

export default TouchScroll;