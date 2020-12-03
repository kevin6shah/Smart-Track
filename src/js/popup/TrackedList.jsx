import React, { Component } from 'react'
import HeaderMain from './components/HeaderMain'

export default class TrackedList extends Component {
    render() {
        return (
            <div>
                <HeaderMain hideLogo={true} />
                <button className='customIcon' style={{
                    position: 'absolute',
                    fontSize: '24px',
                    top: '10px',
                    left: '5px',
                }} onClick={this.props.routeTo.bind(this, 'main')}>
                    <i className="fas fa-chevron-left"></i>
                </button>
            </div>
        )
    }
}
