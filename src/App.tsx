import React, { Component } from 'react';
import AppNav from './AppNav';
import { Provider } from 'react-redux';
import { store } from './reducer/Reducers';

export class App extends Component {
    

    render() {
        return (
            <Provider store={store}>
                <AppNav />
            </Provider>
        );
    }
}

export default App;
