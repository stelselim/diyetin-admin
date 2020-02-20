import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { User } from './reducer/Actions';
import HomePage from './screens/HomePage';
import LoginPage from './screens/LoginPage';
import NavBar from './components/NavBar/NavBar';
import BlogPage from './screens/BlogPage';
import RecipePage from './screens/RecipePage';

interface Props {
    user: User;
}

export class AppNav extends Component<Props>{
    render() {
        return (
            <Router>
                <div>
                    <NavBar />
                    <Route path="/login" exact component={LoginPage} />
                    <Route path="/addblog" exact render={() => {
                        if (this.props.user.username === '')
                            return (<Redirect to={{ pathname: '/login' }} />)
                        return (<BlogPage />)
                    }} />
                    <Route path="/addrecipe" exact render={() => {
                        if (this.props.user.username === '')
                            return (<Redirect to={{ pathname: '/login' }} />)
                        return (<RecipePage />)
                    }} /> 
                    <Route path="/" exact render={() => {
                        if (this.props.user.username === '')
                            return (<Redirect to={{ pathname: '/login' }} />)
                        return (<HomePage />)
                    }} />
                </div>
            </Router>
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

const mapDispatchToProps = (dispatch: any) => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppNav);
