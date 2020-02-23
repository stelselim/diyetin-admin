import firebase from 'firebase';

export class QuoteOfDay {
    firestoreInstance: firebase.firestore.Firestore;

    constructor() {
        this.firestoreInstance = firebase.firestore();
    }

    /**
     * @param {string} newQuote this is input for adding new quote to database.
     * newQuote can consists of person name.
     * @example1 newQuote = "Su akar yolunu bulur"
     * @example2 newQuote = "Koşmayı bıraktığın gün, vardığın gün. - E. Soley"
     */
    addNewQuote = async (newQuote: string) => {
        let quoteData = (
            await this.firestoreInstance
                .collection('/BeslenmeApp/AllDatas/GününSözü')
                .doc('doc')
                .get()
        ).data;
        let a: firebase.firestore.DocumentData;

        //       let quoteArray: Array<string> = quoteData;
        //       quoteArray.push(newQuote);

        //   await this.firestoreInstance.collection("/BeslenmeApp/AllDatas/GününSözü").doc("doc").set(quoteArray);
    };
}
