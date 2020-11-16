import React, { Component } from 'react'
import logo from "../../../img/logo.png"

export default class HeaderMain extends Component {
    onOptionsClicked = () => {
        chrome.runtime.openOptionsPage()
    }

    render() {
        return (
            <div>
                <img src={logo} style={{
                    position: "absolute",
                    left: '5px',
                    top: '3px',
                }} width="45px" height="45px"/>
                <div className='titleMain'>Price Tracker</div>
                <button className='customIcon' style={{
                    fontSize: '24px',
                    top: '10px',
                    right: '5px',
                }} onClick={this.onOptionsClicked}>
                    <i class="fas fa-cog"></i>
                </button>
                <hr style={{marginBottom: '15px', marginTop: '5px'}}/>
            </div>
        )
    }
}
