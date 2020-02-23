import firebase from 'firebase';

interface FAQData {
    Soru: Array<{
        Başlık: string;
        Cevap: string;
        Kaynak: string;
    }>;
}

export class FirebaseFAQ {
    firestoreInstance: firebase.firestore.Firestore;

    constructor() {
        this.firestoreInstance = firebase.firestore();
    }

    /**
     * Doğru Bilinen Yanlışlar
     * @param {string} header this is the question itself.
     * @param {string} answer the answer of the question.
     * @param {string} references the references used in answer.
     */
    AddFalseKnownTrue = async (header: string, answer: string, references: string) => {
        /*
         * This Function takes all data of the category of "Doğru Bilinen yanlışlar".
         * Questions are inside of an array, an element of array is a Map {Başlık:"", Cevap:"", Kaynak:""}.
         * For example, questions[0] = {Başlık:"", Cevap:"", Kaynak: ""}
         * Full Document is like { "Soru": [ { First Question }, { Second Question }, ]  }
         */

        let snapshot: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> = await this.firestoreInstance
            .collection('/BeslenmeApp/AllDatas/SSS')
            .doc('DoğruBilinenYanlışlar')
            .get();

        if (snapshot.exists) {
            console.log('There is the doc');
            let allData = snapshot.data() as FAQData;
            let questionArray = allData.Soru;
            /**
             * This part of function adds the new question to Question Array.
             */
            questionArray.push({
                Başlık: header,
                Cevap: answer,
                Kaynak: references,
            });

            await this.firestoreInstance
                .collection('/BeslenmeApp/AllDatas/SSS')
                .doc('DoğruBilinenYanlışlar')
                .set({ Soru: questionArray });
        } else {
            await this.firestoreInstance
                .collection('/BeslenmeApp/AllDatas/SSS')
                .doc('DoğruBilinenYanlışlar')
                .set({
                    Soru: [
                        {
                            Başlık: header,
                            Cevap: answer,
                            Kaynak: references,
                        },
                    ],
                });
        }
    };

    /**
     * Kilo Alma
     * @param {string} header this is the question itself.
     * @param {string} answer the answer of the question.
     * @param {string} references the references used in answer.
     */
    AddGainWeight = async (header: string, answer: string, references: string) => {
        /*
         * This Function takes all data of the category of "Kilo Alma".
         * Questions are inside of an array, an element of array is a Map {Başlık:"", Cevap:"", Kaynak:""}.
         * For example, questions[0] = {Başlık:"", Cevap:"", Kaynak: ""}
         * Full Document is like { "Soru": [ { First Question }, { Second Question }, ]  }
         */

        let snapshot: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> = await this.firestoreInstance
            .collection('/BeslenmeApp/AllDatas/SSS')
            .doc('KiloAlma')
            .get();

        if (snapshot.exists) {
            let allData = snapshot.data() as FAQData;
            let questionArray = allData.Soru;
            /**
             * This part of function adds the new question to Question Array.
             */
            questionArray.push({
                Başlık: header,
                Cevap: answer,
                Kaynak: references,
            });

            await this.firestoreInstance
                .collection('/BeslenmeApp/AllDatas/SSS')
                .doc('KiloAlma')
                .set({ Soru: questionArray });
        } else {
            await this.firestoreInstance
                .collection('/BeslenmeApp/AllDatas/SSS')
                .doc('KiloAlma')
                .set({
                    Soru: [
                        {
                            Başlık: header,
                            Cevap: answer,
                            Kaynak: references,
                        },
                    ],
                });
        }
    };

    /**
     * Kilo Verme
     * @param {string} header this is the question itself.
     * @param {string} answer the answer of the question.
     * @param {string} references the references used in answer.
     */
    AddLoseWeight = async (header: string, answer: string, references: string) => {
        /*
         * This Function takes all data of the category of "Kilo Verme".
         * Questions are inside of an array, an element of array is a Map {Başlık:"", Cevap:"", Kaynak:""}.
         * For example, questions[0] = {Başlık:"", Cevap:"", Kaynak: ""}
         * Full Document is like { "Soru": [ { First Question }, { Second Question }, ]  }
         */

        let snapshot: firebase.firestore.DocumentData = await this.firestoreInstance
            .collection('/BeslenmeApp/AllDatas/SSS')
            .doc('KiloVerme')
            .get();

        if (snapshot.exists) {
            let allData = snapshot.data() as FAQData;
            let questionArray = allData.Soru;
            /**
             * This part of function adds the new question to Question Array.
             */
            questionArray.push({
                Başlık: header,
                Cevap: answer,
                Kaynak: references,
            });

            await this.firestoreInstance
                .collection('/BeslenmeApp/AllDatas/SSS')
                .doc('KiloVerme')
                .set({ Soru: questionArray });
        } else {
            await this.firestoreInstance
                .collection('/BeslenmeApp/AllDatas/SSS')
                .doc('KiloVerme')
                .set({
                    Soru: [
                        {
                            Başlık: header,
                            Cevap: answer,
                            Kaynak: references,
                        },
                    ],
                });
        }
    };

    /**
     * Sağlıklı Yaşam
     * @param {string} header this is the question itself.
     * @param {string} answer the answer of the question.
     * @param {string} references the references used in answer.
     */
    AddHealthLife = async (header: string, answer: string, references: string) => {
        /*
         * This Function takes all data of the category of "Sağlıklı Yaşam".
         * Questions are inside of an array, an element of array is a Map {Başlık:"", Cevap:"", Kaynak:""}.
         * For example, questions[0] = {Başlık:"", Cevap:"", Kaynak: ""}
         * Full Document is like { "Soru": [ { First Question }, { Second Question }, ]  }
         */

        let snapshot: firebase.firestore.DocumentData = await this.firestoreInstance
            .collection('/BeslenmeApp/AllDatas/SSS')
            .doc('SağlıklıYaşam')
            .get();

        if (snapshot.exists) {
            let allData = snapshot.data() as FAQData;
            let questionArray = allData.Soru;
            /**
             * This part of function adds the new question to Question Array.
             */
            questionArray.push({
                Başlık: header,
                Cevap: answer,
                Kaynak: references,
            });

            await this.firestoreInstance
                .collection('/BeslenmeApp/AllDatas/SSS')
                .doc('SağlıklıYaşam')
                .set({ Soru: questionArray });
        } else {
            await this.firestoreInstance
                .collection('/BeslenmeApp/AllDatas/SSS')
                .doc('SağlıklıYaşam')
                .set({
                    Soru: [
                        {
                            Başlık: header,
                            Cevap: answer,
                            Kaynak: references,
                        },
                    ],
                });
        }
    };
    /**
     * Şaşırtan Bilgiler
     * @param {string} header this is the question itself.
     * @param {string} answer the answer of the question.
     * @param {string} references the references used in answer.
     */
    AddInterestingFacts = async (header: string, answer: string, references: string) => {
        /*
         * This Function takes all data of the category of "Sağlıklı Yaşam".
         * Questions are inside of an array, an element of array is a Map {Başlık:"", Cevap:"", Kaynak:""}.
         * For example, questions[0] = {Başlık:"", Cevap:"", Kaynak: ""}
         * Full Document is like { "Soru": [ { First Question }, { Second Question }, ]  }
         */

        let snapshot: firebase.firestore.DocumentData = await this.firestoreInstance
            .collection('/BeslenmeApp/AllDatas/SSS')
            .doc('ŞaşırtanBilgiler')
            .get();

        if (snapshot.exists) {
            let allData = snapshot.data() as FAQData;
            let questionArray = allData.Soru;
            /**
             * This part of function adds the new question to Question Array.
             */
            questionArray.push({
                Başlık: header,
                Cevap: answer,
                Kaynak: references,
            });

            await this.firestoreInstance
                .collection('/BeslenmeApp/AllDatas/SSS')
                .doc('ŞaşırtanBilgiler')
                .set({ Soru: questionArray });
        } else {
            await this.firestoreInstance
                .collection('/BeslenmeApp/AllDatas/SSS')
                .doc('ŞaşırtanBilgiler')
                .set({
                    Soru: [
                        {
                            Başlık: header,
                            Cevap: answer,
                            Kaynak: references,
                        },
                    ],
                });
        }
    };
}
