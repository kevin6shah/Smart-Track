import Header from './components/Header'
import React, { Component } from 'react'
import firebase from 'firebase'
require('firebase/auth')

export default class ResetPassword extends Component {
    state = {
        error: false,
        errorMessage: '',
        errorColor: 'red',
        email: '',
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        firebase.auth().sendPasswordResetEmail(this.state.email).then(() => {
            this.setState({
                error: true,
                errorColor: '#4caf50',
                errorMessage: 'Password reset instructions were sent to your email',
                email: '',
            })
        }).catch(error => {
            this.setState({
                error: true,
                errorColor: 'red',
                errorMessage: error.message,
                email: '',
            })
        })
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
                <form className='loginType' onSubmit={this.onSubmit} style={{marginBottom: '220px'}}>
                    <input type="text" id="email" name="email" onChange={this.onChange}
                        placeholder="Email" required={true} value={this.state.email}/><br />
                    <button className='bigButton' style={{
                        margin: '15px 0px'
                    }}>Reset Password</button>
                </form>
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