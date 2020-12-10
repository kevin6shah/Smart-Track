import React from 'react';
import Plot from 'react-plotly.js';

export default class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: [],
            y: [],
        };
    }


    componentDidMount() {
        const priceHistory = this.props.prod.priceHistory
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
    }

    render() {
        return (
            <div className='graph'>
                {this.state.x.length === 0
                    ? <div style={{ fontSize: '15px', padding: '90px' }}>
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
                            width: '60%',
                            height: '30%',
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
