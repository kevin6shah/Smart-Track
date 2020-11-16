import Header from './components/Header'
import SignInForm from './components/SignInForm'
import React, { Component } from 'react'

export default class Register extends Component {
    render() {
        return (
            <div>
                <Header />
                <SignInForm buttonText='Register' buttonStyle='orange'/>
                <button className='customIcon' style={{
                    fontSize: '24px',
                    top: '10px',
                    left: '5px',
                }} onClick={this.props.routeTo.bind(this, 'login')}>
                    <i class="fas fa-chevron-left"></i>
                </button>
            </div>
        )
    }
}