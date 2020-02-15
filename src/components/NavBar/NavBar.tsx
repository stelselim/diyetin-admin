import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { User, setUser } from '../../reducer/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface Props {
    user: User;
    setUser: typeof setUser;
}

export class NavBar extends Component<Props> {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Diyetin</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/addblog">Blog</Nav.Link>
                        <Nav.Link href="/addrecipe">Tarif</Nav.Link>
                        <Nav.Link
                            href="/login"
                            onClick={() => {
                                this.props.setUser({ username: '' });
                            }}
                        >
                            Logout
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

interface StateRedux {
    user: User;
}

const mapStateToProps = (state: StateRedux) => {
    const { user } = state;
    return { user };
};

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            setUser,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
