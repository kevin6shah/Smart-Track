import React from "react";

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let username = this.props.profile.username;
        if (!username) username = 'UNDEFINED';
        return (
            <div className="container mt-4 w-75">
                <header className="app-header">

                    <div className="jumbotron">
                        <h3 className="display-4">Price Tracker</h3>
                        <p className="lead">
                            Welcome {username}
                            <br></br>
                            Start the workflow by clicking a link up top or selecting a
                            product.
                        </p>
                        <hr className="my-4" />
                        <p>Track Products, compare prices and more! </p>
                    </div>
                </header>
            </div>
        );
    }
}
export default LandingPage;
