import firebase from 'firebase';

export interface User {
    username: string;
    firebaseuser: firebase.User | string;
}

/**
 * Set the user to the redux store
 * @param {User} key
 */

export const setUser = (key: User) => ({
    type: 'LOGIN',
    payload: key,
});
