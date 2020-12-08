import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { hot } from "react-hot-loader";

import Logo from '../../../img/logo.png';

class OptionsNavbar extends React.Component {

    render() {
        return (
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" className="mainNav sticky-top px-0 py-1">
                <Navbar.Brand className="col-sm-3 col-md-2 mr-2 ">
                    <img
                        src={Logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top mr-2"
                        alt="Price Tracker Logo"
                    />
                    <span className="mr-2">
                        Price Tracker
                    </span>

                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="px-3">
                    <Nav className="mr-auto">
                        <Link to='/' className="nav-link">Products </Link>
                        <Link to='/' className="nav-link">Stores </Link>
                        <Link to='/' className="nav-link">History </Link>
                    </Nav>

                    <Nav>
                        <Link to='/profile' className="nav-link">Profile </Link>
                    </Nav>

                </Navbar.Collapse>


            </Navbar>
        );
    }

}

export default hot(module)(OptionsNavbar)
