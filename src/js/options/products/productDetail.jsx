
import React from 'react';

import Loading from '../utils/loading';
import Graph from './graph';

class ProductDetail extends React.Component {

    render() {
        const prod = this.props.prod;
        return (
            <div>
                <button
                    className="btn btn-primary m-2 float-left"
                    onClick={(e) => { this.props.setProd(null) }}>
                    Back
                </button>
                <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h2 className="display-4">Details</h2>
                    <h5>{prod.title}</h5>

                    <Graph
                        prod={prod}
                    />
                    <h5 className="pricing-card-title">
                        ${prod.priceHistory[prod.priceHistory.length - 1].price}
                    </h5>
                    <ul className="list-unstyled mt-3 mb-4">
                        <li>
                            {prod.priceHistory[prod.priceHistory.length - 1].date.toDate().toString()}
                        </li>
                        <li><a href={prod.url}>Product Link</a></li>
                    </ul>
                </div>
            </div>

        );

    }

}

export default ProductDetail;


