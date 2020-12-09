import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import './products.css';
import ProductsTable from './productsTable';
import ProductDetail from './productDetail';

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchState: 'idle',
            products: {},
            clickProd: null
        };
        this.setProd = this.setProd.bind(this);

    }

    setProd(id) {
        if (id === null) this.setState({ clickProd: null });
        let prod = this.state.products.findIndex(obj => {
            return obj.id === id;
        });
        this.setState({ clickProd: this.state.products[prod] });
        console.log(prod);
    }


    componentDidMount() {
        this.setState({ fetchState: 'loading' });
        let db = firebase.firestore();

        db.collection('items')
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(
                    doc => {
                        const dataNotId = doc.data();
                        return { id: doc.id, ...dataNotId };
                    }
                );
                this.setState({ fetchState: 'success', products: data });
            })
            .catch(error => {
                console.log(error);
                this.setState({ fetchState: 'failure' });

            });
    }

    render() {
        console.log('clicked', this.state.clickProd);
        return (
            <div className="container-fluid w-75 mt-4">
                {(this.state.clickProd != null) ?
                    (
                        <ProductDetail
                            prod={this.state.clickProd}
                            setProd={this.setProd}

                        />
                    ) : (
                        <ProductsTable
                            fetchState={this.state.fetchState}
                            productData={this.state.products}
                            setProd={this.setProd}
                        />
                    )}
            </div>
        );
    }

}

export default Products;
