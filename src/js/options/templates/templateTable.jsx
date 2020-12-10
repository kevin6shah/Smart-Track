import React from 'react';

import Loading from '../utils/loading';

class TemplateTable extends React.Component {

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
                        {this.props.templateData.map((obj) =>
                            <tr key={obj[0]}>
                                <td> {obj[0]} </td>
                                <td> {obj[1]} </td>
                                <td> {obj[2]} </td>
                                <td> {obj[3]} </td>
                                <td> {obj[4]} </td>
                                <td> {obj[5]} </td>
                                <td> {obj[6]} </td>
                                <td> {obj[7]} </td>
                                <td> {obj[8]} </td>
                                <td> {obj[9]} </td>
                                <td>
                                    <button className="btn btn-block btn-success">
                                        {/* onClick={this.requestAction.bind(this, obj.ROW_NO)}>
                                        {obj.REQ_ACTION} */}
                                        Edit
                                    </button>
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


