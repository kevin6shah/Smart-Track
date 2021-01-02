import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

import Logo from '../../../img/logo.png';

class OptionsNavbar extends React.Component {

    render() {
        let links = <>
            <Link to='/' className="nav-link">Home </Link>
        </>;
        if (this.props.profile.role === "basic") {
            links = <>
                <Link to='/products' className="nav-link">Products </Link>
                <Link to='/stores' className="nav-link">Stores </Link>
                <Link to='/tracklist' className="nav-link">Tracking List</Link>
            </>;
        } else if (this.props.profile.role === "admin") {
            links = <>
                <Link to='/products' className="nav-link">Products </Link>
                <Link to='/stores' className="nav-link">Stores </Link>
                <Link to='/tracklist' className="nav-link">Tracking List</Link>
                <Link to='/templates' className="nav-link">Templates </Link>
            </>;
        }

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
                        {links}

                    </Nav>

                    <Nav>
                        <Link to='/profile' className="nav-link">Profile </Link>
                    </Nav>
                </Navbar.Collapse>


            </Navbar>
        );
    }

}

export default OptionsNavbar;
