import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { User } from '../reducer/Actions';

interface Props extends RouteComponentProps {
    user: User;
}

export class HomePage extends Component<Props> {
    render() {
        return (
            <Container>
                <div style={{ textAlign: 'center', fontSize: '3rem' }}>Hoş geldin {this.props.user.username}</div>
            </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage));
