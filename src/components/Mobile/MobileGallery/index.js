import PropTypes from 'prop-types';
import React, {Component} from 'react';
import injectSheet from 'react-jss';
import chevronDown from '../../../assets/chevron-down.svg';
import chevronUp from '../../../assets/chevron-up.svg';
import {COLLAPSE} from "../../../utils/constants";
import {promiseTimeout, setStatePromise} from "../../../utils/index";
import ImageSwitcher from '../ImageSwitcher';
import style, {chevronStyle, COLLAPSE_CHEVRON, EXPAND_CHEVRON} from './style';

const Chevron = injectSheet(chevronStyle)(
	function ({classes, className, icon, onClick}) {
		return (
			<img src={icon} alt="collapse" onClick={onClick}
			     className={[classes.chevron, className].join(' ')}/>
		)
	}
);

class MobileGallery extends Component {
	static propTypes = {
		movies: PropTypes.arrayOf(PropTypes.object),
		selected: PropTypes.object,
		onExpand: PropTypes.func,
		onCollapse: PropTypes.func,
		state: PropTypes.string,
		onScroll: PropTypes.func
	};
	
	constructor(props) {
		super(props);
		this.animateChevron = this.animateChevron.bind(this);
		this.wrapper = null;
		this.state = {
			chevronState: null,
			chevronIcon: chevronDown
		};
	}
	
	async componentDidUpdate(props) {
		if (props.state !== this.props.state) {
			await this.animateChevron();
		}
	}
	
	render() {
		let {
			classes,
			state = '',
			onCollapse,
			onExpand,
			movies,
			selected: {
				imdbID: movieID,
				Title, Released,
				Director, Actors
			},
			onScroll
		} = this.props, {
			chevronState, chevronIcon
		} = this.state, index = movies.findIndex(({imdbID}) => imdbID === movieID);
		return (
			<div className={classes.wrapper}
			     ref={node => this.wrapper = node}>
				<Chevron className={classes.toggle}
				         icon={chevronIcon} animation={chevronState}
				         onClick={state === COLLAPSE ? onExpand : onCollapse}/>
				<div className={classes.card}>&nbsp;</div>
				<ImageSwitcher
					className={classes.imageSwitcher} movies={movies}
					index={index} onScroll={onScroll} state={state}/>
				<div className={classes.spacer}>&nbsp;</div>
				<div className={classes.title}>{Title}</div>
				<div className={classes.subtitle}>{Released}</div>
				<div className={classes.director}>{`Director: ${Director}`}</div>
				{Actors.split(',').map((actor, i) => <div key={i} className={classes[`actor${i}`]}>{actor}</div>)}
				<div className={classes.moreInfo}
				     onClick={onExpand}>
					More Info
				</div>
			</div>
		);
	}
	
	async animateChevron() {
		let setState = setStatePromise(this);
		await Promise.all([
			setState({
				chevronState: this.props.state === COLLAPSE ?
					COLLAPSE_CHEVRON : EXPAND_CHEVRON
			}),
			promiseTimeout(setState, 500, {
				chevronIcon: this.props.state === COLLAPSE ?
					chevronDown : chevronUp
			}),
			promiseTimeout(setState, 1000, {
				chevronState: null
			})
		]);
	}
}

export default injectSheet(style)(MobileGallery);