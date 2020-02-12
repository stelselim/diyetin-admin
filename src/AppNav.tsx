import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './screens/HomePage';
import LoginPage from './screens/LoginPage';
import NavBar from './components/NavBar/NavBar';

export class AppNav extends Component {
    render() {
        return (
            <Router>
                <div>
                    <NavBar />
                    <Switch>
                        <Route path="/" exact component={LoginPage} />
                        <Route path="/homepage" exact component={HomePage} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default AppNav;
