import Header from './components/Header'
import SignInForm from './components/SignInForm'
import React, { Component } from 'react'

export default class Register extends Component {
    render() {
        return (
            <div>
                <Header />
                <SignInForm buttonText='Register' />
                <div className='bottomText'>
                    Go back to Log In Page?<br/>
                    <a href='#' onClick={this.props.routeTo.bind(this, 'login')}>
                        Click Here
                    </a>
                </div>
            </div>
        )
    }
}