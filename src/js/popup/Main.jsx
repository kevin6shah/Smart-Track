import React, { Component } from 'react'
import HeaderMain from './components/HeaderMain'
import ListItem from './components/ListItem'
import firebase from 'firebase'
import Graph from './components/Graph'
require('firebase/auth')
require("firebase/firestore");

export default class Main extends Component {
    state = {
        isTracking: false,
        instance: firebase.firestore(),
    }
    
    componentDidMount() {
        const UID = localStorage.getItem('uid').toString()
        this.state.instance.collection('users')
            .doc(UID).get().then((result) => {
                this.setState({
                    isTracking: result.data()['trackedList']
                        .includes(this.getItemID(this.props.scrapedData.url))
                })
            })
    }

    getItemID = (url) => {
        const stringHash = require("string-hash");
        return stringHash(url).toString()
    }

    currencyToFloat = (currency) => {
        return parseFloat(parseFloat(currency.
                        replace(/[^0-9.-]+/g, "")).toFixed(2))
    }

    onTrackClicked = () => {
        if (this.props.scrapedData.title !== 'Not Available' &&
            this.props.scrapedData.price !== 'Not Available') {
            const ID = this.getItemID(this.props.scrapedData.url)
            const instance = this.state.instance
            instance.collection('items').doc(ID).get().then((item) => {
                const UID = localStorage.getItem('uid').toString()

                let data = {
                    'img': this.props.scrapedData.img,
                    'url': this.props.scrapedData.url,
                    'title': this.props.scrapedData.title,
                }

                const price = this.currencyToFloat(this.props.scrapedData.price.toString())
                const myTimestamp = firebase.firestore.Timestamp.fromDate(new Date());

                if (!item.exists && !this.state.isTracking) {
                    data['priceHistory'] = [{
                        'price': price,
                        'date': myTimestamp,
                    }];
                    instance.collection('items').doc(ID).set(data)
                } else if (item.exists && !this.state.isTracking) {
                    data['priceHistory'] = item.data()['priceHistory']
                    if (data['priceHistory'][data['priceHistory'].length - 1]['price'] !== price) {
                        data['priceHistory'].push({
                            'price': price,
                            'date': myTimestamp,
                        })
                    }
                    instance.collection('items').doc(ID).set(data)
                }

                if (!this.state.isTracking) {
                    instance.collection('users').doc(UID).update({
                        trackedList: firebase.firestore.FieldValue.arrayUnion(ID)
                    })
                } else {
                    instance.collection('users').doc(UID).update({
                        trackedList: firebase.firestore.FieldValue.arrayRemove(ID)
                    })
                }

                this.setState({
                    isTracking: !this.state.isTracking
                })
            })
        }
    }

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
                <button onClick={this.onTrackClicked}
                    className={this.state.isTracking ? 'redButton' : 'bigButton'} style={{
                    margin: '0px',
                }}>{this.state.isTracking ? 'Stop Tracking' : 'Track'}</button>
                <hr style={{marginBottom: '0px'}}/>
                <Graph instance={this.state.instance} url={this.props.scrapedData.url}/>
                <hr style={{ marginTop: '0px' }} />
                <button className='bigButton trackedListButton'
                onClick={this.props.routeTo.bind(this, 'trackedlist')}>My Tracked List</button>
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
