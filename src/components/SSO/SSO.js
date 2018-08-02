import React, { Component } from 'react';

export default class SSO extends Component {

  constructor(props) {
    super(props);
    this.constructUrl = this.constructUrl.bind(this);
  }

  componentDidMount() {
    if(this.props.config.ssoInfo){
      window.location = this.constructUrl(this.props.config);
    }
  }

  constructUrl() {
    const url = `${this.props.config.ssoInfo.authUrl}?client_id=${this.props.config.ssoInfo.client_id}&redirect_uri=${this.props.config.ssoInfo.redirect_uri}&response_type=${this.props.config.ssoInfo.response_type}`;
    return url;
  }

  render() {
    return null;
  }
}
