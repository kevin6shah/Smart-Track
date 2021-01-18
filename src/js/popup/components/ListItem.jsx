import React, { Component } from 'react'
import firebase from 'firebase'
require("firebase/firestore");

export default class ListItem extends Component {
    state = {
        imgErrorHandler: '',
        editing: false,
        threshold: this.props.scrapedData.threshold,
    }
    
    getTitle = () => {
        const titleArr = this.props.scrapedData.title.split(' ')
        let title = ''
        if (titleArr.length > 10) {
            title = titleArr.slice(0, 10).join(' ') + ' ...'
        } else {
            title = titleArr.join(' ')
        }
        return title
    }

    onEditClicked = (ID) => {
        this.setState({
            editing: true,
        })
    }

    onSubmit = () => {
        if (this.checkInput()) {
            var db = firebase.firestore()
            const UID = localStorage.getItem('uid').toString()
            db.collection('users').doc(UID).get().then((snapshot) => {
                let data = snapshot.data()
                data['trackedMap'][[this.props.scrapedData.id]] = parseFloat(this.state.threshold)
                db.collection('users').doc(UID).update({
                    trackedMap: data['trackedMap']
                })
                db.collection('items').doc(this.props.scrapedData.id)
                    .get().then((itemSnapshot) => {
                    let itemData = itemSnapshot.data()
                    itemData['emailMap'][[data.email]] = parseFloat(this.state.threshold)
                        db.collection('items').doc(this.props.scrapedData.id)
                            .update({
                        emailMap: itemData['emailMap']
                    })
                    
                })
            })
            this.setState({
                editing: false,
            })
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
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

    onError = (hostname) => {
        if (this.state.imgErrorHandler === '') {
            this.setState({
                imgErrorHandler: 'https://logo.clearbit.com/' + hostname + '?size=200'
            })
        } else {
            this.setState({
                imgErrorHandler: 'https://www.bu.edu/bedac/files/2015/10/Photo-placeholder.jpg'
            })
        }
    }
    
    render() {
        let hostname = ''
        let host = ''
        
        try {
            hostname = new URL(this.props.scrapedData.url).hostname.replace(/www\d{0,3}[.]/, '')
            host = hostname.substring(0, hostname.indexOf('.'))
        } catch (e) { }

        return (
            <div style={{ textAlign: 'left' }}>
                {this.props.showButton ?
                    <button className='closeButton'
                        onClick={this.props.onClick.bind(this, this.props.scrapedData.id)}>
                        Stop Tracking
                        </button> : <div></div>}
                <span className='itemContainer'>
                    <img src={(this.state.imgErrorHandler !== '') ?
                        this.state.imgErrorHandler:
                        this.props.scrapedData.img}
                        onError={this.onError.bind(this, hostname)}
                        className='itemPic' height='100px' width='100px'/>
                    <div style={{
                        padding: '7px',
                    }}>
                        <p style={{
                            fontSize: '16px',
                            fontWeight: '500',
                            paddingBottom: '5px',
                            textTransform: 'capitalize',
                        }}>{host}</p>
                        <p>{this.getTitle()}</p>
                    </div>
                </span>
                <hr/>
                <span style={{
                    fontSize: '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <p style={{
                        fontWeight: 500,
                    }}>Current Price:</p>
                    <p >{this.props.scrapedData.price !== 'Not Available' ? 
                        '$' + this.props.scrapedData.price :
                        this.props.scrapedData.price}</p>
                </span>
                <hr />
                {this.props.scrapedData.threshold !== undefined ?
                    <div>
                        <span style={{
                            fontSize: '14px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            color: '#4caf50'
                        }}>
                            <p style={{
                                fontWeight: 500,
                            }}>Threshold Value:</p>
                            {this.state.editing ? 
                                <span className="form-group">
                                    $<input type="text"
                                        name="threshold"
                                        value={this.state.threshold}
                                        onChange={this.onChange} style={{
                                            color: '#4caf50',
                                            fontWeight: 500,
                                            border: '1px solid #4caf50',
                                            outline: 'none',
                                            width: '75px',
                                        }} />
                                    <button
                                        onClick={this.onSubmit}
                                        className="fa fa-check" style={{
                                        color: '#4caf50',
                                        cursor: 'pointer',
                                        backgroundColor: 'white',
                                        padding: '0 5px',
                                        border: 'none',
                                        outline: 'none',
                                    }} />
                                </span>:
                                <button style={{
                                    color: '#4caf50',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    backgroundColor: 'white',
                                    border: 'none',
                                    outline: 'none'
                                }} onClick={this.onEditClicked}>
                                    <i className="far fa-edit" style={{
                                        paddingRight: '5px'
                                    }}></i>
                                    <span style={{
                                        fontFamily: "Montserrat",
                                        fontSize: '14px',
                                    }}>${this.state.threshold}</span>
                                </button>
                            }
                        </span>
                        <hr />
                </div>
                : <div/>}
            </div>
        )
    }
}
