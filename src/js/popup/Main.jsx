import React, { Component } from 'react'
import HeaderMain from './components/HeaderMain'
import ListItem from './components/ListItem'
import graph from "../../img/SampleGraph.png"

export default class Main extends Component {
    render() {
        return (
            <div>
                <HeaderMain />
                <ListItem />
                <button className='bigButton' style={{
                    margin: '0px',
                }}>Track</button>
                <hr style={{marginBottom: '0px'}}/>
                <img className='graph' src={graph} />
                <hr style={{ marginTop: '0px' }} />
                <div className='footer'>
                    <button style={{flex: 1}}>My Tracked List</button>
                    <button style={{flex: 1}}>Account Info</button>
                </div>
            </div>
        )
    }
}
