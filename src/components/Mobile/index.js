import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import injectSheet from 'react-jss';
import {connect} from "react-redux";
import {COLLAPSE, EXPAND} from "../../utils/constants";
import FadeImage from '../FadeImage';
import MobileDetail from './MobileDetail';
import MobileGallery from './MobileGallery';
import {backgroundStyle} from "./style";

const TranslatingFadeImage = injectSheet(backgroundStyle)(
	function (props) {
		let {
			classes: {
				translating: className,
				blur: imageClassName,
			}, src
		} = props;
		return <FadeImage {...{className, imageClassName, src}}/>;
	}
);

class Mobile extends Component {
	static propTypes = {
		movies: PropTypes.arrayOf(PropTypes.object),
		onScroll: PropTypes.func
	};
	
	constructor(props) {
		super(props);
		this.wrapper = null;
		this.toggleGalleryState = this.toggleGalleryState.bind(this);
		this.state = {
			galleryState: COLLAPSE
		};
	}
	
	render() {
		let {
				movies,
				movieID,
				onScroll
			} = this.props, {
				galleryState
			} = this.state,
			movie = movies.find(({imdbID}) => imdbID === movieID);
		if (!movie) return null;
		return (
			<Fragment>
				<TranslatingFadeImage state={galleryState} src={movie.mobile}/>
				<MobileDetail movie={movie} state={galleryState}/>
				<MobileGallery
					movies={movies} selected={movie} state={galleryState}
					onCollapse={this.toggleGalleryState(COLLAPSE)}
					onExpand={this.toggleGalleryState(EXPAND)}
					onScroll={onScroll}/>
			</Fragment>
		);
	}
	
	toggleGalleryState(galleryState) {
		return () => this.setState({galleryState});
	}
}

function mapStateToProps(state) {
	let {movies} = state;
	return {movies};
}

export default function () {
	return connect(mapStateToProps)(Mobile);
};