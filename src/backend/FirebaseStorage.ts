import firebase from 'firebase';

export class Firestorage {
    firestoreInstance: firebase.firestore.Firestore;
    storage: firebase.storage.Storage;

    constructor() {
        this.firestoreInstance = firebase.firestore();
        this.storage = firebase.storage();
    }

    addPictureToStorage = () => { };
}

/**
 * @param {string} URL 
 */
export async function deleteImage(url:string){
    await firebase.storage().refFromURL(url).delete();
}