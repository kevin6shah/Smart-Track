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
            clickProd: null,
            selectedIdx: 0,
            numPages: 0,
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

    fetchProds = (pageNum) => {
        this.setState({ fetchState: 'loading' });
        let db = firebase.firestore();

        db.collection('items')
            .get()
            .then(querySnapshot => {
                let data = querySnapshot.docs.map(
                    doc => {
                        const dataNotId = doc.data();
                        return { id: doc.id, ...dataNotId };
                    }
                );
                data.sort(function (a, b) {
                    return Object.keys(b.emailMap).length - Object.keys(a.emailMap).length
                })
                const numP = Math.ceil(data.length / 12)
                data = data.slice(pageNum * 12, (pageNum * 12) + 12)
                this.setState({
                    fetchState: 'success',
                    products: data,
                    numPages: numP,
                    selectedIdx: pageNum,
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({ fetchState: 'failure' });
            });
    }

    componentDidMount() {
        this.fetchProds(this.state.selectedIdx)
    }

    render() {
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
                            selectedIdx={this.state.selectedIdx}
                            numPages={this.state.numPages}
                            fetchState={this.state.fetchState}
                            productData={this.state.products}
                            setProd={this.setProd}
                            onSelectedPage={this.fetchProds}
                        />
                    )}
            </div>
        );
    }

}

export default Products;
