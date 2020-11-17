import React, { Component } from 'react'
import logo from "../../../img/logo.png"

export default class Header extends Component {
    onOptionsClicked = () => {
        chrome.runtime.openOptionsPage()
    }

    render() {
        return (
            <div id='header'>
                <img src={logo} width="150px" height="150px"/>
                <div className='title'>Price Tracker</div>
                <button className='customIcon' style={{
                    fontSize: '24px',
                    top: '10px',
                    right: '5px',
                }} onClick={this.onOptionsClicked}>
                    <i className="fas fa-cog"></i>
                </button>
            </div>
        )
    }
}
