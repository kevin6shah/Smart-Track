import React, { Component } from 'react'
import logo from "../../../img/header_logo.png"
import smart from "../../../img/smart.png"
import track from "../../../img/track.png"

export default class HeaderMain extends Component {
    onOptionsClicked = () => {
        chrome.runtime.openOptionsPage()
    }

    render() {
        return (
            <div>
                {this.props.hideLogo ? <div></div> :
                    <img src={logo} style={{
                        position: "absolute",
                        left: '5px',
                        top: '3px',
                    }} width="45px" height="45px" />
                }
                <span style={{
                    position: 'absolute',
                    top: '17px',
                    left: '0px',
                    right: '0px'
                }}>
                    <img style={{height: '15px'}} src={smart}></img>
                    <img style={{height: '15px'}} src={track}></img>
                </span>
                <button className='customIcon' style={{
                    fontSize: '24px',
                    top: '10px',
                    right: '5px',
                }} onClick={this.onOptionsClicked}>
                    <i className="fas fa-cog"></i>
                </button>
                <hr style={{marginBottom: '15px', marginTop: '45px'}}/>
            </div>
        )
    }
}
