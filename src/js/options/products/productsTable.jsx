
import React from 'react';

import Loading from '../utils/loading';

class ProductsTable extends React.Component {
    onError = (id, hostname) => {
        const api_src = 'https://logo.clearbit.com/' + hostname + '?size=200'
        this.props.productData.map((obj) => {
            if (obj.id === id && obj.img !== api_src) {
                obj.img = api_src
            } else if (obj.id === id && obj.img === api_src) {
                obj.img = 'https://www.bu.edu/bedac/files/2015/10/Photo-placeholder.jpg'
            }
        })
        this.setState({})
    }

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
                    {this.props.productData.map((obj) => {
                        let hostname = ''
                        let host = ''
                        try {
                            hostname = new URL(obj.url).hostname.replace(/www\d{0,3}[.]/, '')
                            host = hostname.substring(0, hostname.indexOf('.'))
                        } catch (e) { }
                        
                        return <div key={obj.id} className="card product-card m-4 box-shadow">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal"
                                    style={{ textTransform: 'capitalize' }}>{host}</h4>
                            </div>
                            <img className="card-img-top product-img" 
                                src={obj.img}
                                onError={this.onError.bind(this, obj.id, hostname)}
                                alt={hostname}
                                style={{ objectFit: 'contain', padding: '10px' }} />
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">
                                    ${obj.priceHistory[obj.priceHistory.length - 1].price}
                                </h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li><h5>{(obj.title.length > 50) ?
                                        obj.title.slice(0, 50) + '...' :
                                        obj.title}</h5></li>
                                    <li>
                                        {obj.priceHistory[obj.priceHistory.length - 1].date.toDate().toString()}
                                    </li>
                                    <li><a target="_blank" rel="noopener noreferrer"
                                        href={obj.url}>Product Link</a></li>
                                </ul>
                                <button
                                    className="btn btn-primary m-2"
                                    onClick={(e) => { this.props.setProd(obj.id) }}>
                                    Details
                                </button>

                            </div>
                        </div>
                        }
                    )}
                </div>
                <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center">
                        <li className={this.props.selectedIdx === 0 ? "page-item disabled" : "page-item"}>
                            <a className="page-link" href="#" onClick={this.props.onSelectedPage.bind(this, this.props.selectedIdx - 1)}>
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>
                        {Array.from({length: this.props.numPages}, (item, index) => (
                            <li className={"page-item" + (this.props.selectedIdx === index ? " active" : "")} key={index}>
                                <a className="page-link" href="#" onClick={this.props.onSelectedPage.bind(this, index)}>
                                    {index + 1}
                                </a>
                            </li>
                        ))}
                        <li className={this.props.selectedIdx === this.props.numPages - 1 ? "page-item disabled" : "page-item"}>
                            <a className="page-link" href="#" onClick={this.props.onSelectedPage.bind(this, this.props.selectedIdx + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <a className='text-muted' href="https://clearbit.com" style={{paddingBottom: '30px', fontSize: '12px'}}>Logos provided by Clearbit</a>
            </div>

        );

    }

}

export default Loading(ProductsTable);


