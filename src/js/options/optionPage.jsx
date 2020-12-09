import React from 'react';
import { Switch, Route } from "react-router-dom";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import ProtectedRoute from './protectedRoute/protectedRoute';
import Navbar from './navbar/navbar';
import Landing from './landing/landing';
import Login from './login/login';
import Profile from './profile/profile';
import Templates from './templates/templates';

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
        let db = firebase.firestore();

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                //get their role
                db.collection('users').doc(user.uid)
                    .get()
                    .then(doc => {
                        let data = doc.data();
                        let role = data.role;
                        if (!role) {
                            role = 'basic';
                        }
                        this.loginStateChange(user.email, role, user.uid);
                        console.log('logged in ', user.email, role, user.uid);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                // not logged in default behavior
            }
        });
    }

    render() {
        return (
            <div className="App">
                <Navbar 
                    profile={this.state.profile}
                />
                <Switch>
                    <Route path="/login" >
                        <Login
                            onLoginStateChange={this.loginStateChange}
                        />
                    </Route>

                    <Route path="/templates" >
                        <ProtectedRoute
                            path="/templates"
                            profile={this.state.profile}>
                            <Templates />
                        </ProtectedRoute>
                    </Route>

                    <Route path="/profile" >
                        <ProtectedRoute
                            path="/profile"
                            profile={this.state.profile}>
                            {/* FUKCING NONSENSE THAT I HAVE TO COPY
                                THE FUCKIN GPROPS ITS SUPPOSED TO PASS THROUGH */}
                            <Profile
                                onLoginStateChange={this.loginStateChange}
                                profile={this.state.profile}
                            />
                        </ProtectedRoute>
                    </Route>

                    <Route exact path="/">
                        <Landing
                            profile={this.state.profile}
                        />
                    </Route>

                    <Route path="*">
                        <Landing
                            profile={this.state.profile}
                        />
                    </Route>

                </Switch>
            </div>
        );
    }

}

export default OptionPage;
