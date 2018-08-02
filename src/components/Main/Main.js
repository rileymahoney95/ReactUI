import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import jwt from 'jsonwebtoken'

import Header from '../Header/Header'
import Page from '../Page/Page'

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ldap: '',
            name: '',
            expireTime: null,
            sessionValid: this.isSessionValid(),
            publicKey: '',
            id_token: '',
            email: ''
        };
        this.updateSession = this.updateSession.bind(this);
    }

    componentDidMount() {
        if (!this.isSessionValid()) return; // used to terminate execution when page is redirected back to home route
        axios.get(this.props.config.ssoInfo.tokenKeysUrl).then((res) => {
            const key = res.data.keys[0].value;
            const id_token = window.location.hash.split('&')[2].split('=')[1];
            this.props.history.replace('/callback')
            const decoded_token = this.verifyAndDecodeToken(id_token, key);
            if (decoded_token) {
                const email = decoded_token.email;
                const name = email.slice(0, email.indexOf('@')).split('_').join(' ');
                const ldap = decoded_token.user_name;
                const expireTime = decoded_token.exp;
                this.setState({
                    ldap: ldap,
                    name: name,
                    expireTime: expireTime,
                    publicKey: key,
                    id_token: id_token,
                    email: email
                });
            }
        }).catch((err) => {
            console.error(`Error getting public key for token: ${err}`);
        });
    }

    verifyAndDecodeToken(id_token, key) {
        let decoded_token = null;
        try {
            decoded_token = jwt.verify(id_token, key, { algorithms: ['RS256'] });
        } catch (error) {
            console.error(`Error verifying and/or decoding token: ${error}`);
        }
        return decoded_token;
    }

    isSessionValid() {
        return window.location.hash.length > 0 && 
          window.location.hash.includes('access_token') &&
          window.location.hash.includes('token_type=bearer')
    }

    updateSession(value) {
        this.setState({
            sessionValid: value
        });
    }

    render() {
        if (!this.state.sessionValid) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <Header name={this.state.name} ssoInfo={this.props.config.ssoInfo}/>
                <Page ldap={this.state.ldap} email={this.state.email} expireTime={this.state.expireTime} verifyToken={this.verifyAndDecodeToken} publicKey={this.state.publicKey} 
                      id_token={this.state.id_token} updateSession={this.updateSession} flowPathUrl={this.props.config.flowPathUrl}/>
            </div>
        );
    }
};