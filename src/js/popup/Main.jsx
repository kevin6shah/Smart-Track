import React, { Component } from 'react'
import HeaderMain from './components/HeaderMain'
import ListItem from './components/ListItem'
import firebase from 'firebase'
import Graph from './components/Graph'
import Threshold from './components/Threshold'
require('firebase/auth')
require("firebase/firestore");

export default class Main extends Component {
    state = {
        isTracking: false,
        threshold: '',
        isCollapsed: true,
        error: false,
        email: '',
        role: '',
    }
    
    componentDidMount() {
        const UID = localStorage.getItem('uid').toString()
        const instance = firebase.firestore()
        instance.collection('users')
            .doc(UID).get().then((result) => {
                try {
                    let hostname = new URL(this.props.scrapedData.url).hostname.replace(/www\d{0,3}[.]/, '')
                    hostname = hostname.substring(0, hostname.indexOf('.'))
                    this.setState({
                        isTracking: Object.keys(result.data()['trackedMap'])
                            .includes(this.getItemID(hostname, this.props.scrapedData.title)),
                        email: result.data()['email'],
                        role: (result.data()['role'] !== undefined)
                            ? '[' + result.data()['role'] + ']' : ''
                    })
                } catch (e) {}
            })
    }

    getItemID = (hostname, title) => {
        const stringHash = require("string-hash");
        return stringHash(hostname + title).toString()
    }

    currencyToFloat = (currency) => {
        return parseFloat(parseFloat(currency.
                            replace(/[^0-9.-]+/g, "")).toFixed(2))
    }

    startTracking = async () => {
        let hostname = ''
        try {
            hostname = new URL(this.props.scrapedData.url).hostname.replace(/www\d{0,3}[.]/, '')
            hostname = hostname.substring(0, hostname.indexOf('.'))
        } catch (e) {
            alert('This website cannot be tracked!')
            return
        }
        const ID = this.getItemID(hostname, this.props.scrapedData.title)
        const UID = localStorage.getItem('uid').toString()
        const instance = firebase.firestore()
        const userDocReference = instance.collection('users').doc(UID)
        const itemDocReference = instance.collection('items').doc(ID)
        const userSnapshot = await userDocReference.get()
        const email = userSnapshot.data()['email']
        const threshold = this.currencyToFloat(this.state.threshold)
        const templateDoc = await instance.collection('templates').doc(hostname).get()

        if (templateDoc.exists === false) {
            alert("This item cannot be tracked. Please try again later")
            return
        }

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

    onOptionsClicked = () => {
        chrome.runtime.openOptionsPage()
    }

    onTrackClicked = () => {
        if (this.props.scrapedData.title !== 'Not Available' &&
            this.props.scrapedData.price !== 'Not Available' &&
            this.props.scrapedData.price !== undefined) {
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
        } else {
            if (this.state.role === '[admin]') {
                chrome.tabs.getSelected(null, function (tab) {
                    if (confirm("Unfortunately, there are no tracking templates for this item. But, you can help us make one. Would you like to continue?")) {
                        window.close()
                        chrome.tabs.sendRequest(tab.id, { greeting: "startSelector" });
                    }
                });
            } else {
                alert("Unfortunately, this webpage cannot be tracked as of now.")
                return
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
                    <Threshold onChange={this.onChange} value={this.state.threshold} />}
                {this.state.error ?
                    <p style={{color:'red'}}>Please enter valid input</p>:<div />}
                <button onClick={this.onTrackClicked}
                    className={this.state.isTracking ? 'redButton' : 'bigButton'} style={{
                    margin: '0px',
                }}>{this.state.isTracking ? 'Stop Tracking' : 'Track'}</button>
                <hr style={{marginBottom: '0px'}}/>
                <Graph scrapedData={this.props.scrapedData}/>
                <hr style={{ marginTop: '0px' }} />
                <button className='bigButton trackedListButton'
                onClick={this.props.routeTo.bind(this, 'trackedlist')}>My Tracked List</button>
                <hr/>
                <div className='footer'>
                    <button onClick={this.onOptionsClicked}>
                        <span className='footerItemContainer'>
                            <i className="fas fa-user" style={{flex: 1}}></i>
                            <p style={{flex: 9}}>{'Account Info: ' + this.state.email + ' ' + this.state.role}</p>
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
