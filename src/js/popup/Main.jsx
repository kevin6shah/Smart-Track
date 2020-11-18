import React, { Component } from 'react'
import HeaderMain from './components/HeaderMain'
import ListItem from './components/ListItem'
import graph from "../../img/SampleGraph.png"
import firebase from 'firebase'
require('firebase/auth')

export default class Main extends Component {
    handleLogout = () => {
        const props = this.props;
        firebase.auth().signOut().then(function () {
            localStorage.removeItem('uid');
            props.routeTo('login')
        }).catch(function(error) {
            console.log(error.message);
        });
    }

    render() {
        return (
            <div>
                <HeaderMain />
                <ListItem scrapedData={this.props.scrapedData}/>
                <button className='bigButton' style={{
                    margin: '0px',
                }}>Track</button>
                <hr style={{marginBottom: '0px'}}/>
                <img className='graph' src={graph} />
                <hr style={{ marginTop: '0px' }} />
                <button className='bigButton trackedListButton'>My Tracked List</button>
                <hr/>
                <div className='footer'>
                    <button>
                        <span className='footerItemContainer'>
                            <i className="fas fa-user" style={{flex: 1}}></i>
                            <p style={{flex: 9}}>Account Info</p>
                            <i className="fas fa-chevron-right" style={{flex: 1, textAlign: 'right'}}></i>
                        </span>
                    </button><br />
                    <button onClick={this.handleLogout}>
                        <span className='footerItemContainer'>
                            <i className="fas fa-sign-out-alt" style={{flex: 1}}></i>
                            <p style={{ flex: 9 }}>Log Out</p>
                            <i className="fas fa-chevron-right" style={{flex: 1, textAlign: 'right'}}></i>
                        </span>
                    </button><br />
                </div>
            </div>
        )
    }
}
