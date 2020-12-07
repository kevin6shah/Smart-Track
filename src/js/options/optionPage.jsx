import React from 'react';
import { Switch, Route } from "react-router-dom";

import Navbar from './navbar/navbar';
import Landing from './landing/landing';
import Login from './login/login';
import firebase from 'firebase';


class OptionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchState: "idle",
        };
    }

    componentDidMount() {
        let UID = null;
        if (localStorage.getItem('uid')) {
            UID = localStorage.getItem('uid').toString();
        }

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
        firebase.analytics();


    }

    render() {
        return (
            <div className="App">
                <Navbar />
                <Switch>
                    <Route path="/login" >
                        <Login />
                    </Route>

                    <Route exact path="/">
                        <Landing />
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
