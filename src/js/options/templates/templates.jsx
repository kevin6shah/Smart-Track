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

        db.collection('templates')
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                let dataRowFormat = []
                const type = ['img', 'price', 'title']
                console.log(data)

                for (const company in data) {
                    let row = [data[company]['hostname']]
                    for (var i = 0; i < type.length; i++) {
                        if (data[company][type[i]] !== undefined) {
                            row.push(data[company][type[i]]['tag'])
                            row.push(Object.keys(data[company][type[i]]['attributes']).join(', '))
                            let attr = []
                            for (const attribute in data[company][type[i]]['attributes']) {
                                if (data[company][type[i]]['attributes'][attribute].length === 1) {
                                    attr.push(data[company][type[i]]['attributes'][attribute])
                                } else {
                                    attr.push('[' + data[company][type[i]]['attributes'][attribute].join(', ') + ']')
                                }
                            }
                            row.push(attr.join(', '))
                        } else {
                            row.push('N/A')
                            row.push('N/A')
                            row.push('N/A')
                        }
                    }
                    dataRowFormat.push(row)
                }

                console.log(dataRowFormat)

                this.setState({ fetchState: 'success', templates: dataRowFormat });
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
