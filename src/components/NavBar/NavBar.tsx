import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
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
                        <Nav.Link>
                            <Link style={{ color: '#555' }} to="/">
                                Home
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link style={{ color: '#555' }} to="/addblog">
                                Blog
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link style={{ color: '#555' }} to="/addrecipe">
                                Tarif
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link style={{ color: '#555' }} to="/faq">
                                SSS
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link style={{ color: '#555' }} to="/qod">
                                Günün Sözleri
                            </Link>
                        </Nav.Link>
                        {this.props.user.firebaseuser === null ? (
                            <div />
                        ) : (
                            <Nav.Link>
                                <Link
                                    style={{ color: '#555' }}
                                    to="/login"
                                    onClick={() => {
                                        this.props.setUser({
                                            username: '',
                                            firebaseuser: '',
                                        });
                                        localStorage.setItem('username', '');
                                        localStorage.setItem('firebaseuser', '');
                                    }}
                                >
                                    Logout
                                </Link>
                            </Nav.Link>
                        )}
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
