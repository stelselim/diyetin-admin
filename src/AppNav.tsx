import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './screens/HomePage';
import LoginPage from './screens/LoginPage';
import NavBar from './components/NavBar/NavBar';
import BlogPage from './screens/BlogPage';
import RecipePage from './screens/RecipePage';

export class AppNav extends Component {
    render() {
        return (
            <Router>
                <div>
                    <NavBar />
                    <Switch>
                        <Route path="/login" exact component={LoginPage} />
                        <Route path="/addblog" exact component={BlogPage} />
                        <Route path="/addrecipe" exact component={RecipePage} />
                        <Route path="/" exact component={HomePage} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default AppNav;
