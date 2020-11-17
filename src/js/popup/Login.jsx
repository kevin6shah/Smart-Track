import Header from './components/Header'
import SignInForm from './components/SignInForm'
import React, { Component } from 'react'
import firebase from 'firebase'
require('firebase/auth')

export default class Login extends Component {
    state = {
        error: false,
        errorMessage: '',
    }

    checkCredentialsAndLogin = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            console.log(user.user.uid);
            this.props.routeTo('main')
        })
        .catch((error) => {
            this.setState({
                error: true,
                errorMessage: error.message,
            })
        });
    }

    render() {
        return (
            <div>
                <Header />
                {this.state.error ?
                    <p style={{
                        color: 'red',
                    }}>
                        {this.state.errorMessage}
                    </p> : <div />}
                <SignInForm buttonText='Log In' onSubmit={this.checkCredentialsAndLogin}/>
                <div className='orLine'><span>OR</span></div>
                <button className='trackedListButton' onClick={this.props.routeTo.bind(this, 'register')} style={{ marginBottom: '15px'}}>
                    Sign up
                </button>
            </div>
        )
    }
}
