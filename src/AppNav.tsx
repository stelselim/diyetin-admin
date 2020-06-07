import React, { Component } from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { User } from './reducer/Actions';
import HomePage from './screens/HomePage';
import LoginPage from './screens/LoginPage';
import NavBar from './components/NavBar/NavBar';
import BlogPage from './screens/Blog/BlogPage';
import RecipePage from './screens/Recipe/RecipePage';
import FAQPage from './screens/FAQPage';
import QODPage from './screens/QuotePage';
import DeleteRecipePage from './screens/Recipe/DeleteRecipePage';
import DeleteBlogPage from './screens/Blog/DeleteBlogPage';
import EditBlogPage from './screens/Blog/EditBlogPage';
import EditRecipePage from './screens/Recipe/EditRecipePage';

interface Props {
    user: User;
}

export class AppNav extends Component<Props> {
    render() {
        return (
            <Router>
                <div>
                    <NavBar />
                    <Route path="/login" exact component={LoginPage} />
                    <Route
                        path="/addblog"
                        exact
                        render={() => {
                            if (this.props.user.username === '') return <Redirect to={{ pathname: '/login' }} />;
                            return <BlogPage />;
                        }}
                    />
                    <Route
                        path="/delblog"
                        exact
                        render={() => {
                            if (this.props.user.username === '') return <Redirect to={{ pathname: '/login' }} />;
                            return <DeleteBlogPage />;
                        }}
                    />
                     <Route
                        path="/editblog"
                        exact
                        render={() => {
                            if (this.props.user.username === '') return <Redirect to={{ pathname: '/login' }} />;
                            return <EditBlogPage />;
                        }}
                    />
                     
                    <Route
                        path="/qod"
                        exact
                        render={() => {
                            if (this.props.user.username === '') return <Redirect to={{ pathname: '/login' }} />;
                            return <QODPage />;
                        }}
                    />
                    <Route
                        path="/addrecipe"
                        exact
                        render={() => {
                            if (this.props.user.username === '') return <Redirect to={{ pathname: '/login' }} />;
                            return <RecipePage />;
                        }}
                    />
                    <Route
                        path="/delrecipe"
                        exact
                        render={() => {
                            if (this.props.user.username === '') return <Redirect to={{ pathname: '/login' }} />;
                            return <DeleteRecipePage />;
                        }}
                    />
                    <Route
                        path="/editrecipe"
                        exact
                        render={() => {
                            if (this.props.user.username === '') return <Redirect to={{ pathname: '/login' }} />;
                            return <EditRecipePage />;
                        }}
                    />
                    <Route
                        path="/faq"
                        exact
                        render={() => {
                            if (this.props.user.username === '') return <Redirect to={{ pathname: '/login' }} />;
                            return <FAQPage />;
                        }}
                    />
                    <Route
                        path="/"
                        exact
                        render={() => {
                            if (this.props.user.username === '') return <Redirect to={{ pathname: '/login' }} />;
                            return <HomePage />;
                        }}
                    />
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

export default connect(mapStateToProps, mapDispatchToProps)(AppNav);
