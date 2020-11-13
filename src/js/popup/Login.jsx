import Header from './components/Header'
import SignInForm from './components/SignInForm'
import React, { Component } from 'react'

export default class Login extends Component {
    render() {
        return (
            <div>
                <Header />
                <SignInForm buttonText='Log In'/>
                <div className='bottomText'>
                    Not a Price Tracker user yet?<br/>
                    <a href='#' onClick={this.props.routeTo.bind(this, 'register')}>
                        Sign up
                    </a>
                </div>
            </div>
        )
    }
}
