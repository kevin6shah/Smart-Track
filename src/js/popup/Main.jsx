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
                <button className='bigButton trackedListButton'>My Tracked List</button>
                <hr/>
                <div className='footer'>
                    <button>
                        <span className='footerItemContainer'>
                            <i class="fas fa-user" style={{flex: 1}}></i>
                            <p style={{flex: 9}}>Account Info</p>
                            <i class="fas fa-chevron-right" style={{flex: 1, textAlign: 'right'}}></i>
                        </span>
                    </button><br />
                    <button onClick={this.props.routeTo.bind(this, 'login')}>
                        <span className='footerItemContainer'>
                            <i class="fas fa-sign-out-alt" style={{flex: 1}}></i>
                            <p style={{flex: 9}}>Log Out</p>
                            <i class="fas fa-chevron-right" style={{flex: 1, textAlign: 'right'}}></i>
                        </span>
                    </button><br />
                </div>
            </div>
        )
    }
}
