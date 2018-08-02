import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios'

import './page.scss'

export default class Page extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            files: [],
            bannerType: "",
            bannerMessage: "",
            uploadDisabled: true,
            templateDropdown: "df_upload"
        }

        this.templates = {
            df_upload: "SupplyChainNetworkFlowPath_Template.csv",
            flowpath_upload: "Flowpath_Template.csv"
        }
        this.closeBanner = this.closeBanner.bind(this);
        this.showResponse = this.showResponse.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleUploadClick = this.handleUploadClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleDrop (files) {
        this.setState({
            bannerType: "",
            bannerMessage: "",
            files: files,
            uploadDisabled: false
        });
    }

    tokenHasExpired() {
        var now = Date.now() / 1000;
        return now > this.props.expireTime;
    }

    tokenSignatureIsValid() {
        return this.props.verifyToken(this.props.id_token, this.props.publicKey) ? true : false;
    }

    handleUploadClick () {
        if(this.tokenHasExpired() || !this.tokenSignatureIsValid()) {
            return this.props.updateSession(false);
        }
        var formData  = new FormData();
        var statusCode = 0;

        formData.append("directFulfillmentSKUNetworkUpload", this.state.files[0]);

        axios.post(`${this.props.flowPathUrl}?userID=${this.props.ldap}&email=${this.props.email}`, formData)
            .then((response) =>  {
                statusCode = response.status;
                this.showResponse(response.data, statusCode);
            })
            .catch((error) => {
                console.error(`${error}`);
                this.showResponse(error.response.data, statusCode);
            })
     }

    showResponse(response, status) {
        let bannerType;
        let bannerMessage;
        if (status === 200) {
            if (response.invalidRecords === 0) {
                bannerType = 'banner success';
                bannerMessage = response.message;
            } else {
                bannerType = 'banner warning';
                bannerMessage = `${response.message}. Invalid Records: ${response.invalidRecords}`;
            }
        } else {
            bannerType = 'banner error';
            bannerMessage = response.message;
        }
        this.setState({
            files: [],
            uploadDisabled: true,
            bannerType: bannerType,
            bannerMessage: bannerMessage
        });
    }

    closeBanner() {
        this.setState({
            bannerType: '',
            bannerMessage: ''
        });
    }

    onChange(e) {
        this.setState({templateDropdown: e.target.value});
    }
    

    render() {
        return (
            <div className="page">
                <div id="responseBanner" className={this.state.bannerType}>
                    <span id="responseMessage" className="message">{this.state.bannerMessage}</span>
                    <span onClick={this.closeBanner} className="close"></span>
                </div>

                <Dropzone className="dz-box" id="dropzone" onDrop={this.handleDrop} accept=".csv">
                    <div id="dzText" className="dz-message" data-dz-message>
                        <span>Select or Drop File</span>
                    </div>
                </Dropzone>

                <p id="filesToUpload"><b>File to Upload</b></p> 

                <p>
                    <i id="check" className="icon_check-circle-filled" hidden={!this.state.files[0]}></i>
                    {this.state.files[0] ? this.state.files[0].name : "No file selected"}
                </p>
                <div id="download">
                    <div className="select-container">
                        <select onChange={this.onChange} value={this.state.templateDropdown} className="dropdown-list sm">
                            <option value="df_upload">Direct Fulfillment Upload</option>
                            <option value="flowpath_upload">Flowpath Upload</option>
                        </select>
                    </div>
                    
                    <a href={`../${this.templates[this.state.templateDropdown]}`} download target='_blank'>
                        <button title="Download Button" className="button primary sm">Download Template</button>
                    </a>

                    <span onClick={this.handleUploadClick}>
                        <button id="btnUpload" className="button primary sm" disabled={this.state.uploadDisabled}>Upload</button>
                    </span>
                </div>
            </div>
        );
    }
}