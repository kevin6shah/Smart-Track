import React, { Component } from 'react'

export default class ListItem extends Component {
    render() {
        return (
            <div style={{ textAlign: 'left' }}>
                <span className='itemContainer'>
                    <img src={this.props.scrapedData.img}
                        className='itemPic' height='100px' width='100px'/>
                    <div style={{
                        padding: '5px',
                    }}>
                        <img src='https://www.marketplace.org/wp-content/uploads/2019/07/Amazondotcom.png' height='17px' width='90px'/>
                        <p style={{
                            marginTop: '5px'
                        }}>{this.props.scrapedData.title}</p>
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
                    <p >{this.props.scrapedData.price}</p>
                </span>
                <hr/>
            </div>
        )
    }
}
