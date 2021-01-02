import React, { Component } from 'react'

export default class ListItem extends Component {
    state = {
        imgErrorHandler: '',
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
        console.log(ID)
        // chrome.runtime.openOptionsPage()
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
            hostname = new URL(this.props.scrapedData.url).hostname.replace('www.', '')
            host = hostname.substring(0, hostname.indexOf('.'))
        } catch (e) {}

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
                        padding: '10px',
                    }}>
                        <p style={{
                            fontFamily: 'Montserrat',
                            fontSize: '16px',
                            fontWeight: '500',
                            paddingBottom: '5px',
                            textTransform: 'capitalize',
                            color: 'black',
                        }}>{host}</p>
                        <p style={{fontSize: '14px'}}>
                            {this.getTitle()}</p>
                    </div>
                </span>
                <hr/>
                <span style={{
                    fontSize: '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <p style={{
                        color: 'black',
                        fontWeight: 500,
                    }}>Current Price:</p>
                    <p style={{color: 'black'}}>{this.props.scrapedData.price !== 'Not Available' ? 
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
                                color: 'black',
                            }}>Threshold Value:</p>
                            <button style={{
                                color: '#4caf50',
                                fontWeight: 500,
                                cursor: 'pointer',
                                backgroundColor: 'white',
                                border: 'none',
                                outline: 'none'
                            }} onClick={this.onEditClicked.bind(this, this.props.scrapedData.id)}>
                                <i className="far fa-edit" style={{
                                    paddingRight: '5px'
                                }}></i>
                                <span style={{
                                    fontFamily: "Montserrat",
                                    fontSize: '14px',
                                }}>${this.props.scrapedData.threshold}</span>
                            </button>
                        </span>
                        <hr />
                </div>
                : <div/>}
            </div>
        )
    }
}
