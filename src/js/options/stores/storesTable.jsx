
import React from 'react';

import Loading from '../utils/loading';

class StoresTable extends React.Component {
    render() {
        return (
            <div>
                <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h1 className="display-4">Stores</h1>
                    <p className="lead">
                        Browse from our wide selection of stores!
                    </p>
                </div>
                <div className="stores-grid row justify-content-center">
                    {this.props.storeData.map((obj) =>
                        <div key={obj.id} className="card store-card m-4 box-shadow">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal"
                                    style={{ textTransform: 'capitalize' }}>{obj.id}</h4>
                            </div>
                            <img className="card-img-top store-img" src={'https://logo.clearbit.com/' + obj.hostname.replace(/www\d{0,3}[.]/, '') + '?size=200'} alt={obj.hostname.replace(/www\d{0,3}[.]/, '')}
                                style={{objectFit: 'contain', padding: '10px'}}/>
                            <a 
                                className="btn btn-primary m-2" 
                                target="_blank" rel="noopener noreferrer"
                                href={'https://' + obj.hostname}>
                                Open
                            </a>
                        </div>
                    )}
                </div>
                <a className='text-muted' href="https://clearbit.com" style={{paddingBottom: '30px', fontSize: '12px'}}>Logos provided by Clearbit</a>
            </div>

        );

    }

}

export default Loading(StoresTable);


