import React from 'react';
import { Switch, Route} from "react-router-dom";

import Navbar from './navbar/navbar';
import Landing from './landing/landing';
import Login from './login/login';


class OptionPage extends React.Component {
    render() {
        return (
            <div className="App">
                <Navbar />
                <Landing />
                <Login />

                {/* <Switch>
                    <Route path="/login" >
                        <Login />
                    </Route>

                    <Route exact path="/">
                        <Login />
                    </Route>

                    <Route path="*">
                    </Route>

                </Switch> */}
            </div>
        );
    }

}

export default OptionPage;
