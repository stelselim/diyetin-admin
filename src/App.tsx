import React, { Component } from 'react';
import AppNav from './AppNav';
import { Provider } from 'react-redux';
import { store } from './reducer/Reducers';
import firebase from 'firebase';
import { firebaseid } from './appid';

export class App extends Component {
    async componentDidMount() {
        firebase.initializeApp(firebaseid);
    }

    render() {
        return (
            <Provider store={store}>
                <AppNav />
            </Provider>
        );
    }
}

export default App;
