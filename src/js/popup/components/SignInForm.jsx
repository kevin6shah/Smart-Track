import React, { Component } from 'react'

export default class SignInForm extends Component {
    state = {
        email: "",
        password: "",
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.setState({
            email: "",
            password: "",
        })
        this.props.onSubmit(this.state.email, this.state.password)
    }

    getClass = () => {
        if (this.props.buttonStyle === 'orange') {
            return 'trackedListButton';
        } else return 'bigButton';
    }

    render() {
        return (
            <React.Fragment>
                <form className='loginType' onSubmit={this.onSubmit}>
                    <input type="text" id="email" name="email" onChange={this.onChange}
                        placeholder="Email" required={true} value={this.state.email}/><br />
                    <input type="password" id="password" name="password" onChange={this.onChange}
                        placeholder="Password" required={true} value={this.state.password}/><br />
                    <button className={this.getClass()} style={{
                        margin: '15px 0px'
                    }}>{this.props.buttonText}</button>
                </form>
            </React.Fragment>
        )
    }
}
