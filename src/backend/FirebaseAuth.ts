import firebase from 'firebase';

/**
 *  All Operations for Authentication: Login, SignUp, Reset Password
 */

export class FirebaseAuth{
    authFirebase: firebase.auth.Auth;
    firestoreFirebase: firebase.firestore.Firestore;



    constructor() {
        this.authFirebase = firebase.auth();
        this.firestoreFirebase = firebase.firestore();

    }
    /**
     * @param {string} email Email of the user.
     * @param {string} password Password of the user.
     * @returns {firebase.auth.UserCredential} User info and all data required.
     */

    loginWithEmailAndPassword = async (email: string, password: string) => {
        
        let answer = await this.authFirebase.signInWithEmailAndPassword(email, password);
        return answer;
       
    }


    /**
     * This function creates a new user.
     * @param {string} email Email of the user.
     * @param {string} password Password of the user.
     * @returns {firebase.auth.UserCredential} User info and all data required.
     */

    signUpWithEmailAndPasswod = async (email: string, password: string, name: string, surname: string)=>{
        /**
         * In here, create a new user with email, password.
         */
        let answer = await this.authFirebase.createUserWithEmailAndPassword(email,password);
        if(answer.user === null){
            throw "User can not be signed up"
        }
        /**
         * The new user when signed up, it must add users name and surname.
         * Also, Document id is going to be the new user uid.
         */        
        

        let uid = answer.user.uid;
        await this.firestoreFirebase.collection("/Diyetisyenler").doc(uid).set(
            {
            name: name,
            surname: surname,
            email: email,
            registerDate: new Date(),
        }
        );
        
        return answer;
    }

    /**
     * When user forgot the password, this function send an email to his account to reset.
     * @param {string} email email of the user
     * 
     */
    resetPasswordWithEmail = async (email: string) =>{
       await this.authFirebase.sendPasswordResetEmail(email);
    }

}