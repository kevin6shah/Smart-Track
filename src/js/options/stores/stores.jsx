import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import './stores.css';
import StoresTable from './storesTable';

class Stores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchState: 'idle',
            stores: {},
            clickProd: null
        };
    }

    componentDidMount() {
        this.setState({ fetchState: 'loading' });
        let db = firebase.firestore();

        db.collection('templates')
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(
                    doc => {
                        const dataNotId = doc.data();
                        return { id: doc.id, ...dataNotId };
                    }
                );
                console.log(data)
                this.setState({ fetchState: 'success', stores: data });
            })
            .catch(error => {
                console.log(error);
                this.setState({ fetchState: 'failure' });

            });
    }

    render() {
        return (
            <div className="container-fluid w-75 mt-4">
                <StoresTable
                    fetchState={this.state.fetchState}
                    storeData={this.state.stores}
                />
            </div>
        );
    }

}

export default Stores;
