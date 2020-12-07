import React, { Component } from 'react'
import HeaderMain from './components/HeaderMain'
import ListItem from './components/ListItem'
import firebase from 'firebase'
import Graph from './components/Graph'
import PriceDrop from './components/PriceDrop'
require('firebase/auth')
require("firebase/firestore");

export default class Main extends Component {
    state = {
        isTracking: false,
        instance: firebase.firestore(),
        threshold: '',
        isCollapsed: true,
        error: false,
    }
    
    componentDidMount() {
        const UID = localStorage.getItem('uid').toString()
        this.state.instance.collection('users')
            .doc(UID).get().then((result) => {
                this.setState({
                    isTracking: Object.keys(result.data()['trackedMap'])
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

    startTracking = async () => {
        const ID = this.getItemID(this.props.scrapedData.url)
        const UID = localStorage.getItem('uid').toString()
        const instance = this.state.instance
        const userDocReference = instance.collection('users').doc(UID)
        const itemDocReference = instance.collection('items').doc(ID)
        const userSnapshot = await userDocReference.get()
        const email = userSnapshot.data()['email']
        const threshold = this.currencyToFloat(this.state.threshold)

        itemDocReference.get().then((item) => {
            let data = {
                'img': this.props.scrapedData.img,
                'url': this.props.scrapedData.url,
                'title': this.props.scrapedData.title,
            }

            const price = this.props.scrapedData.price
            const myTimestamp = firebase.firestore.Timestamp.fromDate(new Date());

            if (!item.exists && !this.state.isTracking) {
                data['priceHistory'] = [{
                    'price': price,
                    'date': myTimestamp,
                }];
                data['emailMap'] = {
                    [email]: threshold,
                }
                itemDocReference.set(data)
            } else if (item.exists && !this.state.isTracking) {
                data['priceHistory'] = item.data()['priceHistory']
                data['emailMap'] = item.data()['emailMap']
                if (data['priceHistory'][data['priceHistory'].length - 1]['price'] !== price) {
                    data['priceHistory'].push({
                        'price': price,
                        'date': myTimestamp,
                    })
                }
                data['emailMap'][[email]] = threshold
                itemDocReference.set(data)
            }

            if (!this.state.isTracking) {
                userDocReference.update({
                    [`trackedMap.${ID}`]: 
                    threshold
                })
            } else {
                let trackedMap = userSnapshot.data()['trackedMap']
                let emailMap = item.data()['emailMap']
                delete trackedMap[[ID]]
                delete emailMap[[email]]
                userDocReference.update({
                    trackedMap: trackedMap
                })
                itemDocReference.update({
                    emailMap: emailMap
                })
            }

            this.setState({
                isTracking: !this.state.isTracking,
                isCollapsed: true,
                error: false,
            })
        })
    }

    checkInput = () => {
        if (!isNaN(this.state.threshold) &&
            this.state.threshold !== null &&
            this.state.threshold !== '' &&
            this.state.threshold > 0 && 
            parseFloat(this.state.threshold) < this.props.scrapedData.price) return true;
        else return false;
    }

    onTrackClicked = () => {
        if (this.props.scrapedData.title !== 'Not Available' &&
            this.props.scrapedData.price !== 'Not Available') {
            if (this.state.isCollapsed === true && !this.state.isTracking) {
                this.setState({
                    isCollapsed: false,
                })
            } else {
                if (this.state.isTracking) this.startTracking();
                else {
                    if (this.checkInput()) {
                        this.startTracking()
                    } else {
                        this.setState({
                            error: true,
                        })
                    }
                }
            }
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

    onChange = (e) => {
        this.setState({
            threshold: e.target.value,
        })
    }

    render() {
        return (
            <div>
                <HeaderMain />
                <ListItem scrapedData={this.props.scrapedData} />
                {this.state.isCollapsed ? <div></div>:
                    <PriceDrop onChange={this.onChange} value={this.state.threshold} />}
                {this.state.error ?
                    <p style={{color:'red'}}>Please enter valid input</p>:<div />}
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
