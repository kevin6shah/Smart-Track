import React from 'react';

import Loading from '../utils/loading';

class OptionsNavbar extends React.Component {

    render() {

        return (
            <div className="dashboardTable mx-auto bg-white rounded shadow">
                <table className="table table-responsive-lg table-sm
                                table-hover table-bordered table-striped
                                table-fixed">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Website Name</th>
                            <th scope="col">URL</th>
                            <th scope="col">Price Attribute</th>
                            <th scope="col">Price Tag</th>
                            <th scope="col">Price Names</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.templateData.map((obj) =>
                                <tr key={obj.id}>
                                    <td> {obj.id} </td>
                                    <td> {obj.name} </td>
                                    <td> {obj.url} </td>
                                    <td> {obj.price.attribute} </td>
                                    <td> {obj.price.tag} </td>
                                    <td> {obj.price.names.join(', ')} </td>

                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
        );

    }

}

export default Loading(OptionsNavbar);


