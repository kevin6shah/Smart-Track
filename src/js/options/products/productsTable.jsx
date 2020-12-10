
import React from 'react';

import Loading from '../utils/loading';

class ProductsTable extends React.Component {

    render() {
        return (
            <div>
                <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h1 className="display-4">Products</h1>
                    <p className="lead">
                        Browse all products and view the lastest prices. 
                        Search for products you want to start track!
                    </p>
                </div>
                <div className="products-grid row justify-content-center">
                    {this.props.productData.map((obj) =>
                        <div key={obj.id} className="card product-card m-4 box-shadow">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">{obj.id}</h4>
                            </div>
                            <img className="card-img-top product-img" src={obj.img} alt="Card image cap"
                                style={{objectFit: 'contain', padding: '10px'}}/>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">
                                    ${obj.priceHistory[obj.priceHistory.length - 1].price}
                                </h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li><h5>{obj.title}</h5></li>
                                    <li>
                                        {obj.priceHistory[obj.priceHistory.length - 1].date.toDate().toString()}
                                    </li>
                                    <li><a href={obj.url}>Product Link</a></li>
                                </ul>
                                <button 
                                    className="btn btn-primary m-2" 
                                    onClick={(e) => {this.props.setProd(obj.id)}}>
                                    Details
                                </button>

                            </div>
                        </div>
                    )}

                </div>
            </div>

        );

    }

}

export default Loading(ProductsTable);


