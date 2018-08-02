import React from 'react';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';

import App from './components/App';
require("./resources/SupplyChainNetworkFlowPath_Template.csv");
require("./resources/Flowpath_Template.csv");
require("./resources/favicon.ico");

const history = createBrowserHistory();


render(<App history={history} />, document.querySelector('#app'));
