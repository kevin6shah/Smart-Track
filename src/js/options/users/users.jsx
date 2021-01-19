import React, { Component } from 'react'
import UsersTable from './usersTable'
import firebase from 'firebase/app';
import 'firebase/firestore';

export default class Users extends Component {
    state = {
        data: [],
    }

    componentDidMount() {
        var db = firebase.firestore()
        let data = [];
        db.collection('users').get().then((snapshot) => {
            snapshot.forEach(function (doc) {
                const userInfo = doc.data()
                const role = (userInfo.role !== 'admin') ? 'Normal User' : 'Admin User'
                data.push([doc.id, userInfo.fname + ' ' + userInfo.lname, userInfo.email, role])
            });
            this.setState({
                data: data,
            })
        })
    }

    render() {
        return (
            <div>
                <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h1 className="display-4">Users</h1>
                    <p className="lead">
                        Get User Information and Edit/Delete them!
                    </p>
                </div>
                <UsersTable data={this.state.data}/>
            </div>
        )
    }
}
