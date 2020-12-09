import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import './templates.css';
import TemplateTable from './templateTable';

class Templates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchState: 'idle',
            templates: {},
        };
    }

    componentDidMount() {
        this.setState({ fetchState: 'loading' });
        let db = firebase.firestore();

        db.collection('websites')
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(
                    doc => {
                        const dataNotId = doc.data();
                        return { id: doc.id, ...dataNotId };
                    }
                );
                this.setState({ fetchState: 'success', templates: data });
            })
            .catch(error => {
                console.log(error);
                this.setState({ fetchState: 'failure' });

            });
    }

    render() {
        return (
            <div className="container-fluid w-75 mt-4">
                <TemplateTable
                    fetchState={this.state.fetchState}
                    templateData={this.state.templates}
                />
            </div>
        );
    }

}

export default Templates;
