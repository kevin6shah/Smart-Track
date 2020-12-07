import React, { Component } from 'react'

export default class Threshold extends Component {
    render() {
        return (
            <div>
                <span style={{
                    fontSize: '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <p style={{
                        fontWeight: 500,
                    }}>Notify When:</p>
                    <span>
                        $ <input type="text" placeholder="Price is less than"
                            onChange={this.props.onChange}
                            style={{
                                width: '110px',
                                padding: '5px 15px',
                                border: 'none',
                                border: '1px solid lightgray',
                                fontFamily: "Montserrat",
                                outline: 'none',
                            }} value={this.props.value}/>
                    </span>
                </span>
                <hr/>
            </div>
        )
    }
}
