import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import App from './components/App';
import Loading from './components/Loading'
import store from './redux';
import registerServiceWorker from './registerServiceWorker';
import {constructRoute, preloadImage} from "./utils";
import {MOVIE_URL, ROOT_APP, ROOT_URL, TOP_10} from "./utils/constants";
import LOADING_BACKGROUND from './assets/wall-e.jpg';

async function initializeApp() {
	await preloadImage(LOADING_BACKGROUND);
	await new Promise(resolve =>
		ReactDOM.render(
			<Provider store={store}>
				<BrowserRouter>
					<Fragment>
						<Switch>
							<Redirect exact={true} from={ROOT_URL} to={constructRoute(TOP_10[0].movieID)}/>
							<Redirect exact={true} from={ROOT_APP} to={constructRoute(TOP_10[0].movieID)}/>
							<Route path={MOVIE_URL} component={App}/>
						</Switch>
						<Loading/>
					</Fragment>
				</BrowserRouter>
			</Provider>,
			document.getElementById('root'), resolve));
	registerServiceWorker();
	return 'DONE_RENDERING';
}

initializeApp().then(console.log).catch(console.error);
