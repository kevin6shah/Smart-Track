import React, { Component } from 'react'
import '../../../css/popup.css'
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
                <button style={{ fontSize: '24px' }} onClick={this.onOptionsClicked}>
                    <i className="fa fa-gear"></i>
                </button>
            </div>
        )
    }
}
