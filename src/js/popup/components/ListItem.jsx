import React, { Component } from 'react'

export default class ListItem extends Component {
    render() {
        return (
            <div style={{ textAlign: 'left' }}>
                <span className='itemContainer'>
                    <img src='https://images-na.ssl-images-amazon.com/images/I/71aclXndH3L._AC_SL1500_.jpg'
                        className='itemPic' height='100px' width='100px'/>
                    <div style={{
                        padding: '5px',
                    }}>
                        <img src='https://www.marketplace.org/wp-content/uploads/2019/07/Amazondotcom.png' height='17px' width='90px'/>
                        <p style={{
                            marginTop: '5px'
                        }}>YAMAHA FS800 Small Body Solid Top Acoustic Guitar, Natural</p>
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
                    <p >$199.99</p>
                </span>
                <hr/>
            </div>
        )
    }
}
