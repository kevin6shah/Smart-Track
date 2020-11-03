import React from 'react';
import { hot } from "react-hot-loader";


function LandingPage() {
    return (
        <div className="container mt-4 w-75">
            <header className="app-header">
                {/* <img src={narmadaLogo} className="app-logo h-50 w-50 mb-1" alt="logo" /> */}

                <div className="jumbotron">
                    <h3 className="display-4">Price Tracker</h3>
                    <p className="lead"> 
                        Start the workflow by clicking a link up top or selecting a product.
                    </p>
                    <hr className="my-4" />
                    <p>Track Products, compare prices and more! </p>
                </div>
            </header>
        </div>

    );
}
export default hot(module)(LandingPage)
