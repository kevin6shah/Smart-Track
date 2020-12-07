import React from "react";

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchState: "idle",
        };
    }

    render() {
        return (
            <div className="container mt-4 w-75">
                <header className="app-header">

                    <div className="jumbotron">
                        <h3 className="display-4">Price Tracker</h3>
                        <p className="lead">
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
