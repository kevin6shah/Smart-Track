import React, { Component } from 'react'

export default class SignInForm extends Component {
    render() {
        return (
            <React.Fragment>
                <form className='loginType'>
                    <input type="text" id="email" name="email" placeholder="Email" required="true"/><br/>
                    <input type="password" id="password" name="password" placeholder="Password" required="true"/><br/>
                    <button>{this.props.buttonText}</button>
                </form>
            </React.Fragment>
        )
    }
}
