import PropTypes from 'prop-types';
import React, {Component} from 'react';
import injectSheet from 'react-jss';
import {connect} from "react-redux";
import Dot from "../Dot/index";
import FadeImage from '../FadeImage';
import Rating from '../Rating';
import TouchScroll from "../TouchScroll";
import Info from './DesktopInfo';
import style from './style';

class Desktop extends Component {
	static propTypes = {
		movies: PropTypes.array,
		movieID: PropTypes.string,
		onScroll: PropTypes.func
	};
	
	constructor(props) {
		super(props);
		this.onScroll = this.onScroll.bind(this);
	}
	
	render() {
		let {
				classes,
				movies,
				movieID
			} = this.props,
			movie = movies.find(({imdbID}) => imdbID === movieID);
		if (!movie) return null;
		let {
			desktop,
			Title, Year,
			Plot, Ratings,
			imdbRating
		} = movie, rt = Ratings[1], mc = Ratings[2];
		return (
			<TouchScroll
				className={classes.desktop}
				threshold={25}
				onScroll={this.onScroll}
				onSwipeUp={() => this.onScroll({deltaY: 100})}
				onSwipeDown={() => this.onScroll({deltaY: -100})}>
				<FadeImage
					className={classes.blurredBackground}
					imageClassName={classes.blur}
					src={desktop}/>
				<div className={classes.panel}>
					<FadeImage
						className={classes.poster}
						imageClassName={classes.posterImage}
						src={desktop}/>
					<h1 className={classes.title}>{Title} • {Year}</h1>
					<div className={classes.ratingWrapper}>
						<Rating
							rottenTomatoes={rt.Value}
							metacritics={mc.Value}
							className={classes.rating}/>
						<div className={classes.ratingText}>{imdbRating * 10}</div>
						<div className={classes.ratingPercent}>%</div>
						<div className={classes.ratingSub}>Liked It</div>
						<Dot color='#7fffaa' className={classes.legendDot}/>
						<span className={classes.legendText}>RottenTomatoes</span>
						<Dot color='#1976D2' className={classes.legendDot}/>
						<span className={classes.legendText}>MetaCritics</span>
					</div>
					<Info movie={movie}/>
					<div className={classes.plotTitle}>Plot</div>
					<div className={classes.plotContent}>{Plot}</div>
				</div>
			</TouchScroll>
		);
	}
	
	onScroll({deltaY}) {
		let {onScroll} = this.props;
		onScroll && onScroll(deltaY);
	}
}

function mapStateToProps(state) {
	let {movies} = state;
	return {movies};
}

export default function (screenWidth) {
	return connect(mapStateToProps)(injectSheet(style(screenWidth))(Desktop));
};