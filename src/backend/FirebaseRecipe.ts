import firebase from 'firebase';

export class FirebaseRecipe {
    firestoreInstance: firebase.firestore.Firestore;

    constructor() {
        this.firestoreInstance = firebase.firestore();
    }

    addNewRecipe = async () => {};
}
