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
                <Navbar.Brand className=" col-sm-3 col-md-2 mr-0 overflow-hidden">
                    <img
                        src={Logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top mr-2"
                        alt="Price Tracker Logo"
                    />
                    <span>
                        Price Tracker
                    </span>

                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="px-3">
                    <Nav className="mr-auto">
                        <Nav.Link to='/' className="nav-link">Products </Nav.Link>
                        <Nav.Link to='/' className="nav-link">Stores </Nav.Link>
                        <Nav.Link to='/' className="nav-link">History </Nav.Link>
                        <Nav.Link to='/' className="nav-link">Profile </Nav.Link>


                        <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                    <Nav>
                    </Nav>

                </Navbar.Collapse>


            </Navbar>
        );
    }

}

export default hot(module)(OptionsNavbar)
