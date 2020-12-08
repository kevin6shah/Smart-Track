import React from 'react';
import { Switch, Route } from "react-router-dom";
import firebase from 'firebase/app';
import 'firebase/auth';

import ProtectedRoute from './protectedRoute/protectedRoute';
import Navbar from './navbar/navbar';
import Landing from './landing/landing';
import Login from './login/login';
import Profile from './profile/profile';

class OptionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {
                uid: null,
                username: 'ANON',
                role: 'ROLE_ANON',
            },
        };
        this.loginStateChange = this.loginStateChange.bind(this);
    }

    loginStateChange(newUsername, newRole, newUid) {
        this.setState({
            profile: {
                uid: newUid,
                username: newUsername,
                role: newRole,
            },
        });
    }

    componentDidMount() {
        const firebaseConfig = {
            apiKey: "AIzaSyBbg-3-MdPoJEqIYsy7oPY-ygiG_nbEFDQ",
            authDomain: "smart-track-d9d47.firebaseapp.com",
            databaseURL: "https://smart-track-d9d47.firebaseio.com",
            projectId: "smart-track-d9d47",
            storageBucket: "smart-track-d9d47.appspot.com",
            messagingSenderId: "1037701953092",
            appId: "1:1037701953092:web:221a8548a2dcfd13186e11",
            measurementId: "G-Q7JZX1QQ9V"
        };
        firebase.initializeApp(firebaseConfig);

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                if (user.role) {
                    this.loginStateChange(user.email, user.role, user.uid);
                } else {
                    this.loginStateChange(user.email, 'basic', user.uid);
                }
                console.log('logged in ', user.email, user.role, user.uid);
            }
        });

    }

    render() {
        return (
            <div className="App">
                <Navbar />
                <Switch>
                    <Route path="/login" >
                        <Login
                            onLoginStateChange={this.loginStateChange}
                        />
                    </Route>

                    <Route path="/profile" >
                        <ProtectedRoute
                            path="/profile"
                            onLoginStateChange={this.loginStateChange}
                            profile={this.state.profile}>
                            <Profile />
                        </ProtectedRoute>

                    </Route>

                    <Route exact path="/">
                        <Landing
                            profile={this.state.profile}
                        />
                    </Route>

                    <Route path="*">
                        <Landing />
                    </Route>

                </Switch>
            </div>
        );
    }

}

export default OptionPage;
