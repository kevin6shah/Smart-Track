import React from 'react';
import Loading from '../utils/loading';
import firebase from 'firebase/app';
import 'firebase/firestore';

class TemplateTable extends React.Component {
    state = {
        editMode: false,
        key: '',
        templateData: this.props.templateData,
    }

    onClick = (key) => {
        this.setState({
            editMode: !this.state.editMode,
            key: key,
        })
    }

    onDelete = (key) => {
        if (confirm('Are you sure you want to delete ' + this.state.key + ' template?\nNote: This is IRREVERSIBLE!')) {
            let db = firebase.firestore();
            let hostname = ''
            hostname = key.replace(/www\d{0,3}[.]/, '')
            hostname = hostname.substring(0, hostname.indexOf('.'))
            // TODO: DELETE TEMPLATE HERE
            db.collection('templates').doc(hostname).delete().then(() => {
                this.props.callback.bind(this)
            })

            db.collection('items').get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data());
                    const data = doc.data()
                    let itemHostname = new URL(data['url']).hostname.replace(/www\d{0,3}[.]/, '')
                    itemHostname = itemHostname.substring(0, itemHostname.indexOf('.'))
                    if (hostname === itemHostname) {
                        const emails = Object.keys(data['emailMap'])
                        for (var i = 0; i < emails.length; i++) {
                            db.collection('users').where("email", "==", emails[i])
                                .get().then((snapshot) => {
                                    snapshot.forEach((userDoc) => {
                                        let trackedMap = userDoc.data()['trackedMap']
                                        // DELETE USER TRACKED ITEM HERE
                                        delete trackedMap[[doc.id]]
                                        db.collection('users').doc(userDoc.id).update({
                                            trackedMap: trackedMap
                                        })
                                    })
                                })
                        }
                        // TODO: DELETE ITEM HERE
                        db.collection('items').doc(doc.id).delete()
                    }
                });
            })
            let templateData = this.state.templateData
            let idx = -1
            for (var i = 0; i < templateData.length; i++) {
                if (templateData[i][0] == key) {
                    idx = i
                    break
                }
            }
            try {
                delete templateData[[idx]]
                this.setState({
                    templateData: templateData
                })
                alert("Template was succesfully deleted!")
            } catch (e) {
                alert("An error occured in template deletion")
            }
        }
    }

    onChange = () => {
        console.log("onChange")
    }

    render() {

        return (
            <div className="dashboardTable mx-auto bg-white rounded shadow">
                <table className="table table-responsive-lg table-sm
                                table-hover table-bordered table-striped
                                table-fixed">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Website Name</th>
                            <th scope="col">Image Tag</th>
                            <th scope="col">Image Attribute</th>
                            <th scope="col">Image Values</th>
                            <th scope="col">Price Tag</th>
                            <th scope="col">Price Attribute</th>
                            <th scope="col">Price Values</th>
                            <th scope="col">Title Tag</th>
                            <th scope="col">Title Attribute</th>
                            <th scope="col">Title Values</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.templateData.map((obj) =>
                            <tr key={obj[0]} className='form-group'>
                                <td> {obj[0]} </td>
                                <td> {(this.state.editMode && this.state.key === obj[0]) ? <input className="form-control" type="text" value={obj[1]} onChange={this.onChange}/> : obj[1]} </td>
                                <td> {(this.state.editMode && this.state.key === obj[0]) ? <input className="form-control" type="text" value={obj[2]} onChange={this.onChange}/> : obj[2]} </td>
                                <td> {(this.state.editMode && this.state.key === obj[0]) ? <input className="form-control" type="text" value={obj[3]} onChange={this.onChange}/> : obj[3]} </td>
                                <td> {(this.state.editMode && this.state.key === obj[0]) ? <input className="form-control" type="text" value={obj[4]} onChange={this.onChange}/> : obj[4]} </td>
                                <td> {(this.state.editMode && this.state.key === obj[0]) ? <input className="form-control" type="text" value={obj[5]} onChange={this.onChange}/> : obj[5]} </td>
                                <td> {(this.state.editMode && this.state.key === obj[0]) ? <input className="form-control" type="text" value={obj[6]} onChange={this.onChange}/> : obj[6]} </td>
                                <td> {(this.state.editMode && this.state.key === obj[0]) ? <input className="form-control" type="text" value={obj[7]} onChange={this.onChange}/> : obj[7]} </td>
                                <td> {(this.state.editMode && this.state.key === obj[0]) ? <input className="form-control" type="text" value={obj[8]} onChange={this.onChange}/> : obj[8]} </td>
                                <td> {(this.state.editMode && this.state.key === obj[0]) ? <input className="form-control" type="text" value={obj[9]} onChange={this.onChange}/> : obj[9]} </td>
                                <td>
                                    <button className="btn btn-block btn-success" onClick={this.onClick.bind(this, obj[0])}>
                                        {(this.state.editMode && this.state.key === obj[0])? 'Save' : 'Edit'}
                                    </button>
                                    {(this.state.editMode && this.state.key === obj[0]) ?
                                        <button className="btn btn-block btn-danger" onClick={this.onDelete.bind(this, obj[0])}>
                                            ×
                                        </button> : <div/>
                                    }  
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );

    }

}

export default Loading(TemplateTable);


