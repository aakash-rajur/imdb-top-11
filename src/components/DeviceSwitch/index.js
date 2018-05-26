import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from "react-redux";
import {dequeueLoading, enqueueLoading} from "../../redux/loading";
import {mapDispatchToProps, setStatePromise} from "../../utils";
import {DESKTOP, MOBILE} from "../../utils/constants";

const DEVICE_LOADING = 'DEVICE_LOADING';

class DeviceSwitch extends Component {
	static propTypes = {
		desktop: PropTypes.func,
		mobile: PropTypes.func,
		enqueueLoading: PropTypes.func,
		dequeueLoading: PropTypes.func,
		deviceProps: PropTypes.object,
		onChange: PropTypes.func
	};
	
	static defaultProps = {
		deviceProps: {}
	};
	
	constructor(props) {
		super(props);
		this.onResize = this.onResize.bind(this);
		this.state = {
			component: null
		};
		this.screenWidth = window.screen.width;
		this.componentCreator = null;
		this.DEVICE = null;
		props.enqueueLoading(DEVICE_LOADING);
	}
	
	async componentDidMount() {
		window.addEventListener('resize', this.onResize);
		await this.onResize();
	}
	
	componentWillUnmount() {
		window.removeEventListener('resize', this.onResize)
	}
	
	render() {
		let {component: Device} = this.state;
		if (!Device) return null;
		return <Device {...this.props.deviceProps}/>
	}
	
	async onResize() {
		let DEVICE = window.innerWidth < window.innerHeight ? MOBILE : DESKTOP,
			setState = setStatePromise(this);
		
		if (this.DEVICE === DEVICE) {
			let newWidth = window.screen.width;
			if (this.screenWidth !== newWidth) {
				let component = this.componentCreator(this.screenWidth = newWidth);
				await setState({component});
			}
			return;
		}
		this.DEVICE = DEVICE;
		let {desktop, mobile, onChange} = this.props,
			componentLoader = DEVICE === DESKTOP ? desktop :
				DEVICE === MOBILE ? mobile : null;
		onChange && onChange(DEVICE);
		this.props.enqueueLoading(DEVICE_LOADING);
		if (!componentLoader) return;
		let {default: componentCreator} = await componentLoader(),
			component = (this.componentCreator = componentCreator)(window.screen.width);
		await setState({component});
		this.props.dequeueLoading(DEVICE_LOADING);
	}
}

export default connect(null, mapDispatchToProps({
	enqueueLoading,
	dequeueLoading
}))(DeviceSwitch);