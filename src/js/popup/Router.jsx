import React, { Component } from 'react'
import Login from './Login'
import Register from './Register'
import Main from './Main'

export default class Router extends Component {
    state = {
        routeTo: 'main'
    }

    handleRoute = (route) => {
        this.setState({routeTo: route})
    }

    getComponent = () => {
        if (this.state.routeTo === 'login') {
            return <Login routeTo={this.handleRoute}/>
        } else if (this.state.routeTo === 'register') {
            return <Register routeTo={this.handleRoute}/>
        } else if (this.state.routeTo === 'main') {
            return <Main routeTo={this.handleRoute}/>
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
