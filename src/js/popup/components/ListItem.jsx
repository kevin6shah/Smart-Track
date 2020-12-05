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
    
    render() {
        return (
            <div style={{ textAlign: 'left' }}>
                {this.props.showButton ?
                    <button className='closeButton'
                        onClick={this.props.onClick.bind(this, this.props.index)}>
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
                    <p >${this.props.scrapedData.price}</p>
                </span>
                <hr/>
            </div>
        )
    }
}
