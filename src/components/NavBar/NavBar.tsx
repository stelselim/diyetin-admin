import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';

export class NavBar extends Component {
    render() {
        return (
            <NavBar>
                <Navbar.Brand href="/">Diyetin Admin</Navbar.Brand>
            </NavBar>
        )
    }
}

export default NavBar
