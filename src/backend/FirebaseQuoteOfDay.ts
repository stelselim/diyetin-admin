import firebase from 'firebase';

interface QuoteData {
    sözler: Array<string>;
}

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
        let snapshot: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> = await this.firestoreInstance
            .collection('/BeslenmeApp/AllDatas/GününSözü')
            .doc('doc')
            .get();
        console.log(snapshot);
        console.log(snapshot.exists);
        if (snapshot.exists) {
            let quoteData = snapshot.data() as QuoteData;
            quoteData.sözler.push(newQuote);
            await this.firestoreInstance
                .collection('/BeslenmeApp/AllDatas/GününSözü')
                .doc('doc')
                .set({ sözler: quoteData });
        } else {
            let arrayNew: Array<string> = [newQuote];
            await this.firestoreInstance
                .collection('/BeslenmeApp/AllDatas/GününSözü')
                .doc('doc')
                .set({ sözler: arrayNew });
        }
        //       let quoteArray: Array<string> = quoteData;
        //       quoteArray.push(newQuote);

        //   await this.firestoreInstance.collection("/BeslenmeApp/AllDatas/GününSözü").doc("doc").set({"sözler":quoteArray});
    };
}
