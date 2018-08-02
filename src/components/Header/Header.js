import React from 'react';
import './Header.scss'

const Header = props => {

    function logout(){
        window.location = props.ssoInfo.logoutUrl;
    }

    return (
        <div className="header">
            <div className="header-logo">
                <i className="icon_homedepot"></i>
            </div>
            <div className="header-info">
                <label className="product-info">Supply Chain Network Flow Path</label>
                <label className="user-info">{props.name} </label>
            </div>
                <div className="header-actions">
                <button id="logoutBtn" className="button primary sm" onClick={logout}>Logout</button>
            </div>
        </div>
    );
}

export default Header;