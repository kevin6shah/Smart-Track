import React, { Component } from 'react'

export default class ListItem extends Component {
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
        chrome.runtime.openOptionsPage()
    }
    
    render() {
        return (
            <div style={{ textAlign: 'left' }}>
                {this.props.showButton ?
                    <button className='closeButton'
                        onClick={this.props.onClick.bind(this, this.props.scrapedData.id)}>
                        Stop Tracking
                        </button> : <div></div>}
                <span className='itemContainer'>
                    <img src={this.props.scrapedData.img}
                        className='itemPic' height='100px' width='100px'/>
                    <div style={{
                        padding: '5px',
                    }}>
                        <img src='https://www.marketplace.org/wp-content/uploads/2019/07/Amazondotcom.png' height='17px' width='90px'/>
                        <p style={{
                            marginTop: '5px'
                        }}>{this.getTitle()}</p>
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
