import Header from './components/Header'
import SignInForm from './components/SignInForm'
import React, { Component } from 'react'
import firebase from 'firebase'
require('firebase/auth')
require("firebase/firestore");

export default class Register extends Component {
    state = {
        error: false,
        errorMessage: '',
        errorColor: 'red',
    }

    signUpUser = (fname, lname, email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                if (userCredentials.user) {
                    userCredentials.user.updateProfile({
                        displayName: fname + ' ' + lname,
                    }).then((s) => {
                        firebase.firestore().collection('users').doc(userCredentials.user.uid)
                            .set({
                                'trackedMap': {},
                                'email': userCredentials.user.email,
                                'fname': fname,
                                'lname': lname,
                            }).then((r) => {
                                this.setState({
                                    error: true,
                                    errorMessage: 'Successfully signed up! Please go back to the login page.',
                                    errorColor: '#4caf50',
                                })
                            })
                    })
                }
        })
            .catch((error) => {
            this.setState({
                error: true,
                errorMessage: (error.code === 'auth/weak-password') ? 'The password is too weak.' : error.message,
                errorColor: 'red',
            })
        });
    }

    render() {
        return (
            <div>
                <Header />
                {this.state.error ?
                    <p style={{
                        color: this.state.errorColor,
                    }}>
                        {this.state.errorMessage}
                    </p> : <div />}
                <SignInForm buttonText='Register' buttonStyle='orange' onSubmit={this.signUpUser}/>
                <button className='customIcon' style={{
                    fontSize: '24px',
                    top: '10px',
                    left: '5px',
                }} onClick={this.props.routeTo.bind(this, 'login')}>
                    <i className="fas fa-chevron-left"></i>
                </button>
            </div>
        )
    }
}