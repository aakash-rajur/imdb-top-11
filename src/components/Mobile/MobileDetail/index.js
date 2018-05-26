import PropTypes from 'prop-types';
import React from 'react';
import injectSheet from 'react-jss';
import popcorn from '../../../assets/popcorn.png';
import Dot from "../../Dot/index";
import Rating from '../../Rating/index';
import MobileInfo from '../MobileInfo/index';
import style from './style';

function MobileDetail({classes, movie}) {
	let {
		Title, Year,
		Plot, Ratings, imdbRating
	} = movie, rt = Ratings[1], mc = Ratings[2];
	
	return (
		<div className={classes.detail}>
			<img src={popcorn} alt="popcorn" className={classes.popcornBegin}/>
			<div className={classes.content}>
				<div className={[classes.spanWide, classes.title].join(' ')}>{Title}</div>
				<div className={[classes.spanWide, classes.year].join(' ')}>{Year}</div>
				<Rating
					rottenTomatoes={rt.Value}
					metacritics={mc.Value}
					className={classes.rating}/>
				<div className={classes.ratingText}>{imdbRating * 10}</div>
				<div className={classes.ratingPercent}>%</div>
				<div className={classes.ratingSub}>Liked It</div>
				<Dot color='#7fffaa' className={classes.rtDot}/>
				<span className={classes.rtLegend}>RottenTomatoes</span>
				<Dot color='#1976D2' className={classes.mcDot}/>
				<span className={classes.mcLegend}>MetaCritics</span>
				<MobileInfo movie={movie}/>
				<div className={classes.plotTitle}>Plot</div>
				<div className={classes.plotContent}>{Plot}</div>
			</div>
			<img src={popcorn} alt="popcorn" className={classes.popcornEnd}/>
		</div>
	);
}

export default injectSheet(style)(MobileDetail);

MobileDetail.propTypes = {
	movie: PropTypes.object,
	state: PropTypes.string
};