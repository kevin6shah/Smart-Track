import Header from './components/Header'
import SignInForm from './components/SignInForm'
import React, { Component } from 'react'

export default class Login extends Component {
    state = {
        error: false,
    }

    checkCredentialsAndLogin = (email, password) => {
        if (email === 'test' && password === 'test') {
            this.props.routeTo('main')
        } else {
            this.setState({
                error: true,
            })
        }
    }

    render() {
        return (
            <div>
                <Header />
                {this.state.error ?
                    <p style={{
                        color: 'red',
                    }}>
                        Please try again with valid credentials!
                    </p> : <div />}
                <SignInForm buttonText='Log In' onSubmit={this.checkCredentialsAndLogin}/>
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
