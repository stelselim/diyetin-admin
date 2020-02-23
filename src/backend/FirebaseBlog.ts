import firebase, { firestore } from 'firebase';

export class FirebaseBlogOperations {
    authFirebase: firebase.auth.Auth;
    firestoreFirebase: firebase.firestore.Firestore;
    storageFirebase: firebase.storage.Storage;

    constructor() {
        this.firestoreFirebase = firebase.firestore();
        this.authFirebase = firebase.auth();
        this.storageFirebase = firebase.storage();
    }

    /**
     *
     * @param {string} imageUrl this is image url which is from image in Firebase Storage.
     * @param {string} header  Max: 100 Characters - this is header of blog.
     * @param {string} mainIdea mainIdea summarize what the blog is about.
     * @param {string} blogText the text of blog.
     * @param {string} references the sources for blog.
     * @param {string} author  name & surname of blog writer
     */
    addNewBlog = async (header: string, references: string, imageUrl: string, mainIdea: string, blogText: string, author: string) => {
        if (header.length > 100) {
            throw new Error('Header should be less than 100 Characters');
        }
        try {
            let ans = await this.firestoreFirebase.collection('/BeslenmeApp/AllDatas/Blog').add({
                EklenmeTarihi: new Date(),
                BlogYazısı: blogText,
                AnaDüşünce: mainIdea,
                Başlık: header,
                Kaynaklar: references,
                Resim: imageUrl,
                Yazar: author,
            });
            return ans;
        } catch (e) {
            throw e;
        }
    };

    /**
     * @param {firestore.DocumentSnapShot} documentReference this is the reference of the blog post that would like to update
     * @param {string} header  Max: 100 Characters - this is header of blog.
     * @param {string} mainIdea mainIdea summarize what the blog is about.
     * @param {string} blogText the text of blog.
     * @param {string} references the sources for blog.
     * @param {string} author  name & surname of blog writer
     * @param {string} imageUrl this is image url which is from image in Firebase Storage.
     */
    updateBlogPost = async (
        imageUrl: string,
        header: string,
        mainIdea: string,
        blogText: string,
        author: string,
        references: string,
        documentReference: firestore.DocumentSnapshot
    ) => {
        await this.firestoreFirebase.doc(documentReference.ref.path).update({
            BlogYazısı: blogText,
            AnaDüşünce: mainIdea,
            Başlık: header,
            Resim: imageUrl,
            Kaynaklar: references,
            Yazar: author,
        });
    };

    /**
     * @param {firestore.DocumentSnapshot} documentReference this is the document reference of the blog post that would like to delete.
     */
    deleteBlogPost = async (documentReference: firestore.DocumentSnapshot) => {
        let documentPath = documentReference.ref.path;
        await this.firestoreFirebase.doc(documentPath).delete();
    };

    /**
     * @param {ArrayBuffer} image
     * @returns {string} download url
     */
    uploadImage = async (image: ArrayBuffer) => {
        let answer = await this.storageFirebase.ref('blog').put(image);
        return answer.ref.getDownloadURL();
    };
}
