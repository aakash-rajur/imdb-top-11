import PropTypes from 'prop-types';
import React, {Component} from 'react';
import injectSheet from 'react-jss';
import {connect} from 'react-redux';
import {promiseTimeout, setStatePromise} from "../../utils";
import LOADING_BACKGROUND from '../../assets/wall-e.jpg'
import style from './style';

const Loader = injectSheet(style)(
	function ({classes}) {
		return (
			<div className={classes.loading}>
				<img src={LOADING_BACKGROUND} alt="loading background"
				     className={classes.loaderBackground}/>
				<div className={classes.loaderAnimation}>&nbsp;</div>
			</div>
		);
	}
);

class Loading extends Component {
	static propTypes = {
		loading: PropTypes.arrayOf(PropTypes.string)
	};
	
	constructor(props) {
		super(props);
		this.state = {
			loading: Boolean(props.loading.length),
			animating: true
		};
	}
	
	async componentDidUpdate(prevProps) {
		if (prevProps.loading !== this.props.loading) {
			let setState = setStatePromise(this),
				loading = Boolean(this.props.loading.length);
			switch (loading) {
				case true:
					return await setState({loading, animating: true});
				case false: {
					await setState({loading, animating: true});
					return await promiseTimeout(setState, 300, {animating: false})
				}
				default:
					return;
			}
		}
	}
	
	render() {
		return <Loader {...this.state}/>
	}
}

function mapStateToProps(state) {
	let {loading} = state;
	return {
		loading
	};
}

export default connect(mapStateToProps)(Loading);