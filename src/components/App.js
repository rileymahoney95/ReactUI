import React from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import 'babel-polyfill';
import axios from 'axios';

import SSO from './SSO/SSO';
import Main from './Main/Main';
import { getSSOInfo } from '../util/ssoHelper';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            config: {}
        }
    }

    componentDidMount() {
        axios.get('/config').then(res => {
            const info = getSSOInfo(res.data);
            this.setState({
                config: {
                    ssoInfo: info,
                    flowPathUrl: res.data.FLOW_PATH_URL
                }
            });
        }).catch(err => {
            console.error(`Error getting config: ${err}`)
        });
    }

    render() {
        if (Object.keys(this.state.config).length === 0) {
            return (
                <div className="progress-linear indeterminate"></div>
            )
        }
        else{
            return (
                <Router history={this.props.history}>
                    <Switch>
                        <Route exact path='/' render={() => <SSO config={this.state.config} />} />
                        <Route path='/callback' render={(props) => <Main {...props} config={this.state.config} />} />
                    </Switch>
                </Router>
            );
        }
    }
}

export default App;

