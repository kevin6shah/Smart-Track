import React, { Component } from 'react'
import Login from './Login'
import Register from './Register'

export default class Main extends Component {
    state = {
        routeTo: 'login'
    }

    handleRoute = (route) => {
        this.setState({routeTo: route})
    }

    getComponent = () => {
        if (this.state.routeTo === 'login') {
            return <Login routeTo={this.handleRoute}/>
        } else if (this.state.routeTo === 'register') {
            return <Register routeTo={this.handleRoute}/>
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.getComponent()}
            </React.Fragment>
        )
    }
}
