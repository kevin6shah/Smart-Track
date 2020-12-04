import React, { Component } from 'react'
import Plot from 'react-plotly.js';

export default class Graph extends Component {
    state = {
        x: [],
        y: [],
    }

    getItemID = (url) => {
        const stringHash = require("string-hash");
        return stringHash(url).toString()
    }

    componentDidMount() {
        const ID = this.getItemID(this.props.url)
        this.props.instance.collection('items')
            .doc(ID).get().then((result) => {
                const priceHistory = result.data()['priceHistory']
                let x = []
                let y = []
                for (var i = 0; i < priceHistory.length; i++) {
                    x.push(priceHistory[i]['date'].toDate())
                    y.push(priceHistory[i]['price'])
                }
                this.setState({
                    x: x,
                    y: y,
                })
            })
    }

	render() {
		return (
            <div className='graph'>
                {this.state.x.length === 0
                    ? <div style={{ fontSize: '15px', padding: '90px'}}>
                        No historical data available
                    </div> : 
                    <Plot
                    data={[
                        {
                            x: this.state.x,
                            y: this.state.y,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: 'red' },
                        },
                    ]}
                    layout={{
                        autorange: false,
                        autosize: false,
                        width: 300,
                        height: 215,
                        title: 'Price Graph',
                        margin: {
                            l: 42,
                            r: 10,
                            b: 30,
                            t: 50,
                            pad: 4,
                        },
                        xaxis: {
                            'tickformat': '%b %d'
                        },
                        yaxis: {
                            'tickprefix': '$'
                        }
                    }}
                    config={{ displayModeBar: false }}
                    />
                }
            </div>
		)
	}
}
