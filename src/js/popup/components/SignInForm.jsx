import React, { Component } from 'react'

export default class SignInForm extends Component {
    state = {
        fname: "",
        lname: "",
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
            fname: "",
            lname: ""
        })
        if (this.props.buttonText.toLowerCase() === 'register') {
            this.props.onSubmit(this.state.fname, this.state.lname,
                this.state.email, this.state.password)
        } else {
            this.props.onSubmit(this.state.email, this.state.password)
        }
    }

    getClass = () => {
        if (this.props.buttonStyle === 'orange') {
            return 'trackedListButton';
        } else return 'bigButton';
    }

    getNameInputs = () => {
        if (this.props.buttonText.toLowerCase() === 'register') {
            return <span style={{
                display: 'flex',
            }}>
                <input type="text" id="fname" name="fname" onChange={this.onChange}
                    placeholder="First Name" required={true} value={this.state.fname}
                    style={{
                        width: '117px',
                    }}/><br />
                <input type="text" id="lname" name="lname" onChange={this.onChange}
                    placeholder="Last Name" required={true} value={this.state.lname}
                    style={{
                        width: '117px',
                    }}/><br />
                    
            </span>
        }
    }

    render() {
        return (
            <React.Fragment>
                <form className='loginType' onSubmit={this.onSubmit}>
                    {this.getNameInputs()}
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
