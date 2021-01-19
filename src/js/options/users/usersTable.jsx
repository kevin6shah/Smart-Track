import React, { Component } from 'react'
import Loading from '../utils/loading';
import firebase from 'firebase/app';
import 'firebase/firestore';
import './users.css'

class UsersTable extends Component {
    state = {
        editing: false,
        selected: '',
    }

    onEdit = (row) => {
        if (this.state.editing == false) {
            this.setState({
                editing: true,
                selected: row[0],
                [row[0]]: row[3],
            })
        } else {
            if (this.state[[row[0]]] !== undefined) {
                var db = firebase.firestore();
                if (this.state[[row[0]]] === 'Admin User') {
                    db.collection('users').doc(row[0]).update({
                        role: 'admin',
                    })
                } else {
                    db.collection('users').doc(row[0]).update({
                        role: firebase.firestore.FieldValue.delete()
                    })
                }
                this.setState({
                    editing: false,
                    selected: '',
                })
            }
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">UID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                                {this.props.data.map((obj) => {
                                    return <tr key={obj[0]}>
                                        <th scope="row">{obj[0]}</th>
                                        <td>{obj[1]}</td>
                                        <td>{obj[2]}</td>
                                        <td>{(this.state.editing && this.state.selected === obj[0]) ?
                                            <select className="form-control form-control-sm"
                                                name={obj[0]}
                                                value={this.state[[obj[0]]]}
                                                onChange={this.onChange}>
                                                <option value='Normal User'>Normal User</option>
                                                <option value='Admin User'>Admin User</option>
                                            </select> : (this.state[[obj[0]]] !== undefined
                                                && this.state[[obj[0]]] !== '' ? this.state[[obj[0]]] : obj[3])}</td>
                                        <td>
                                            <button type="button" className="btn btn-success" onClick={this.onEdit.bind(this, obj)}>
                                                <i className={"fa" + (this.state.editing && this.state.selected === obj[0]? " fa-check" : "s fa-edit")}></i></button>
                                            <button type="button" className="btn btn-danger"><i className="far fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
        )
    }
}

export default Loading(UsersTable);