import React from "react";
import firebase from 'firebase'

import './login.css';
import SubmitButton from '../submitButton/submitButton';

class LoginMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            fetchState: 'idle'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ fetchState: 'loading' });
        firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
            .then((user) => {
                console.log('user', user.user.uid);
                localStorage.setItem('uid', user.user.uid);
                this.setState({ fetchState: 'success' });

                // let history = this.props.history;
                // let location = this.props.location;
                // let { from } = location.state || { from: { pathname: "/" } };
                // history.replace(from);

            })
            .catch((error) => {
                console.log(error)
                this.setState({ fetchState: 'failure' });
            });
    }

    render() {
        return (
            <div className="container w-50 mt-4" >

                <form className="form-signin" onSubmit={this.handleSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

                    <input type="text" id="inputUsername" name="username" className="form-control" placeholder="Username"
                        value={this.state.username} onChange={this.handleChange} />

                    <input type="password" id="inputPassword" name="password" className="form-control" placeholder="Password" required
                        value={this.state.password} onChange={this.handleChange} />

                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" />
                              &nbsp;
                              Remember me
                        </label>
                    </div>
                    <SubmitButton fetchState={this.state.fetchState} />
                </form>
            </div>
        );
    }
}

export default LoginMain;
