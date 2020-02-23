import firebase from 'firebase';

export class Firestorage {
    firestoreInstance: firebase.firestore.Firestore;
    storage: firebase.storage.Storage;

    constructor() {
        this.firestoreInstance = firebase.firestore();
        this.storage = firebase.storage();
    }

    addPictureToStorage = () => {};
}
