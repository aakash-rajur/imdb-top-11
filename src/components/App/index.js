import PropTypes from 'prop-types';
import React, {Component} from 'react';
import injectSheet from 'react-jss';
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {dequeueLoading} from "../../redux/loading";
import {getAllMovies, preLoadImages} from "../../redux/movies";
import {constructRoute, getMovieID, mapDispatchToProps} from "../../utils";
import {INDEX_LOADING} from "../../utils/constants";
import DeviceSwitch from "../DeviceSwitch";
import style from './style';

class App extends Component {
	static propTypes = {
		getMovies: PropTypes.func,
		dequeueLoading: PropTypes.func,
		preLoadImages: PropTypes.func
	};
	
	constructor(props) {
		super(props);
		this.state = {
			movieID: getMovieID(props.history.location.pathname)
		};
		this.onScroll = this.onScroll.bind(this);
		this.onRouteChange = this.onRouteChange.bind(this);
		this.onDeviceChange = this.onDeviceChange.bind(this);
		this.device = null;
		this.transitioning = false;
		this.routeChangeListener = null;
	}
	
	componentDidMount() {
		this.props.getMovies();
		this.props.dequeueLoading(INDEX_LOADING);
		let {history} = this.props;
		this.routeChangeListener = history.listen(this.onRouteChange);
	}
	
	componentWillUnmount() {
		this.routeChangeListener.unlisten();
	}
	
	render() {
		return (
			<DeviceSwitch
				onChange={this.onDeviceChange}
				deviceProps={{movieID: this.state.movieID, onScroll: this.onScroll}}
				desktop={() => import(/* webpackChunkName: "desktop" */'../Desktop')}
				mobile={() => import(/* webpackChunkName: "mobile" */'../Mobile')}/>
		);
	}
	
	onRouteChange() {
		let {location: {pathname}} = this.props.history,
			movieID = getMovieID(pathname);
		if (this.state.movieID === movieID) return;
		this.setState({movieID});
	}
	
	onScroll(deltaY) {
		if (this.transitioning) return;
		let {movies, history} = this.props;
		if (!movies || !movies.length || !history) return;
		let {location: {pathname}} = history,
			movieID = getMovieID(pathname),
			index = movies.findIndex(({imdbID}) => imdbID === movieID),
			next = deltaY > 0 ? (index + 1) % movies.length :
				index === 0 ? movies.length - 1 : index - 1,
			{imdbID} = movies[next];
		imdbID && history.push(constructRoute(imdbID));
		this.transitioning = false;
	}
	
	onDeviceChange(DEVICE) {
		let {preLoadImages} = this.props;
		preLoadImages(DEVICE);
	}
}

function mapStateToProps(state) {
	let {
		movies
	} = state;
	return {movies};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps({
		getMovies: getAllMovies,
		dequeueLoading,
		preLoadImages
	})
)(withRouter(injectSheet(style)(App)));