import firebase from 'firebase';

export interface details{
    nameOfRecipe: string,
    personWhoCooks: string,
    DocumentReference: firebase.firestore.DocumentReference,
}


export class FirebaseRecipe {
    firestoreInstance: firebase.firestore.Firestore;
    storageFirebase: firebase.storage.Storage;

    constructor() {
        this.firestoreInstance = firebase.firestore();
        this.storageFirebase = firebase.storage();
    }



    /**
     * @param {string} imageURL firebase storage url of the recipe
     * @param {string} recipeName max lenght 70 characters.
     * @param {string} ingredients recipe ingredients.
     * @param {string} howToCook the explanantion of cooking.
     * @param {int} calorie the calorie of recipe.
     * @param {double} protein the protein of recipe as gr.
     * @param {double} carb the carb of recipe as gr.
     * @param {double} fat the fat of recipe as gr.
     * @param {string} servingSize portion (porsiyon) of the Meal
     * @param {string} nameSurname the name of the person who cookes 
     */

    addHighCalorie = async (imageURL: string, recipeName: string, ingredients: string, howToCook: string, calorie: number, protein: number, carb: number, fat: number, servingSize: string, nameSurname: string) => {

        let data = {
            
            Kalori: { 
                Kalori: calorie.toString(), 
                Karbonhidrat: carb.toString(),
                Protein: protein.toString(),
                Yağ: fat.toString(),
            },
            Kategori: "YüksekKalorili",
            Porsiyon: servingSize,
            Resim: imageURL,
            Tarifinİsmi:recipeName,
            Yapılışı:howToCook,
            YapanKişi:nameSurname,
            İçindekiler:ingredients,

        }

        await this.firestoreInstance.collection("/BeslenmeApp/AllDatas/Tarifler/Kategoriler/YüksekKalorili").add(data);


    }

    /**
     * @param {string} imageURL firebase storage url of the recipe
     * @param {string} recipeName max lenght 70 characters.
     * @param {string} ingredients recipe ingredients.
     * @param {string} howToCook the explanantion of cooking.
     * @param {int} calorie the calorie of recipe.
     * @param {double} protein the protein of recipe as gr.
     * @param {double} carb the carb of recipe as gr.
     * @param {double} fat the fat of recipe as gr.
     * @param {string} servingSize portion (porsiyon) of the Meal
     * @param {string} nameSurname the name of the person who cookes 
     */

    addLowCalorie = async (imageURL: string, recipeName: string, ingredients: string, howToCook: string, calorie: number, protein: number, carb: number, fat: number, servingSize: string, nameSurname: string) => {

        let data = {
            
            Kalori: { 
                Kalori: calorie.toString(), 
                Karbonhidrat: carb.toString(),
                Protein: protein.toString(),
                Yağ: fat.toString(),
            },
            Kategori: "DüşükKalorili",
            Porsiyon: servingSize,
            Resim: imageURL,
            Tarifinİsmi:recipeName,
            Yapılışı:howToCook,
            YapanKişi:nameSurname,
            İçindekiler:ingredients,

        }

        await this.firestoreInstance.collection("/BeslenmeApp/AllDatas/Tarifler/Kategoriler/DüşükKalorili").add(data);


    }


    /**
     * @param {string} imageURL firebase storage url of the recipe
     * @param {string} recipeName max lenght 70 characters.
     * @param {string} ingredients recipe ingredients.
     * @param {string} howToCook the explanantion of cooking.
     * @param {int} calorie the calorie of recipe.
     * @param {double} protein the protein of recipe as gr.
     * @param {double} carb the carb of recipe as gr.
     * @param {double} fat the fat of recipe as gr.
     * @param {string} servingSize portion (porsiyon) of the Meal
     * @param {string} nameSurname the name of the person who cookes 
     */

    addFitDesert = async (imageURL: string, recipeName: string, ingredients: string, howToCook: string, calorie: number, protein: number, carb: number, fat: number, servingSize: string, nameSurname: string) => {

        let data = {
            
            Kalori: { 
                Kalori: calorie.toString(), 
                Karbonhidrat: carb.toString(),
                Protein: protein.toString(),
                Yağ: fat.toString(),
            },
            Kategori: "FitTatlılar",
            Porsiyon: servingSize,
            Resim: imageURL,
            Tarifinİsmi:recipeName,
            Yapılışı:howToCook,
            YapanKişi:nameSurname,
            İçindekiler:ingredients,

        }

        await this.firestoreInstance.collection("/BeslenmeApp/AllDatas/Tarifler/Kategoriler/FitTatlılar").add(data);


    }


    /**
     * @param {string} imageURL firebase storage url of the recipe
     * @param {string} recipeName max lenght 70 characters.
     * @param {string} ingredients recipe ingredients.
     * @param {string} howToCook the explanantion of cooking.
     * @param {int} calorie the calorie of recipe.
     * @param {double} protein the protein of recipe as gr.
     * @param {double} carb the carb of recipe as gr.
     * @param {double} fat the fat of recipe as gr.
     * @param {string} servingSize portion (porsiyon) of the Meal
     * @param {string} nameSurname the name of the person who cookes 
     */

    addFastRecipe = async (imageURL: string, recipeName: string, ingredients: string, howToCook: string, calorie: number, protein: number, carb: number, fat: number, servingSize: string, nameSurname: string) => {

        let data = {
            
            Kalori: { 
                Kalori: calorie.toString(), 
                Karbonhidrat: carb.toString(),
                Protein: protein.toString(),
                Yağ: fat.toString(),
            },
            Kategori: "HızlıTarifler",
            Porsiyon: servingSize,
            Resim: imageURL,
            Tarifinİsmi:recipeName,
            Yapılışı:howToCook,
            YapanKişi:nameSurname,
            İçindekiler:ingredients,

        }

        await this.firestoreInstance.collection("/BeslenmeApp/AllDatas/Tarifler/Kategoriler/HızlıTarifler").add(data);


    }

    /**
     * @param {string} imageURL firebase storage url of the recipe
     * @param {string} recipeName max lenght 70 characters.
     * @param {string} ingredients recipe ingredients.
     * @param {string} howToCook the explanantion of cooking.
     * @param {int} calorie the calorie of recipe.
     * @param {double} protein the protein of recipe as gr.
     * @param {double} carb the carb of recipe as gr.
     * @param {double} fat the fat of recipe as gr.
     * @param {string} servingSize portion (porsiyon) of the Meal
     * @param {string} nameSurname the name of the person who cookes 
     */

    addLookingNew = async (imageURL: string, recipeName: string, ingredients: string, howToCook: string, calorie: number, protein: number, carb: number, fat: number, servingSize: string, nameSurname: string) => {

        let data = {
            
            Kalori: { 
                Kalori: calorie.toString(), 
                Karbonhidrat: carb.toString(),
                Protein: protein.toString(),
                Yağ: fat.toString(),
            },
            Kategori: "DeğişiklikArayanlar",
            Porsiyon: servingSize,
            Resim: imageURL,
            Tarifinİsmi:recipeName,
            Yapılışı:howToCook,
            YapanKişi:nameSurname,
            İçindekiler:ingredients,

        }

        await this.firestoreInstance.collection("/BeslenmeApp/AllDatas/Tarifler/Kategoriler/DeğişiklikArayanlar").add(data);


    }
    /**
     * @param {string} imageURL firebase storage url of the recipe
     * @param {string} recipeName max lenght 70 characters.
     * @param {string} ingredients recipe ingredients.
     * @param {string} howToCook the explanantion of cooking.
     * @param {int} calorie the calorie of recipe.
     * @param {double} protein the protein of recipe as gr.
     * @param {double} carb the carb of recipe as gr.
     * @param {double} fat the fat of recipe as gr.
     * @param {string} servingSize portion (porsiyon) of the Meal
     * @param {string} nameSurname the name of the person who cookes 
     */

    addStudentRecipe= async (imageURL: string, recipeName: string, ingredients: string, howToCook: string, calorie: number, protein: number, carb: number, fat: number, servingSize: string, nameSurname: string) => {

        let data = {
            
            Kalori: { 
                Kalori: calorie.toString(), 
                Karbonhidrat: carb.toString(),
                Protein: protein.toString(),
                Yağ: fat.toString(),
            },
            Kategori: "ÖğrencilereÖzel",
            Porsiyon: servingSize,
            Resim: imageURL,
            Tarifinİsmi:recipeName,
            Yapılışı:howToCook,
            YapanKişi:nameSurname,
            İçindekiler:ingredients,

        }

        await this.firestoreInstance.collection("/BeslenmeApp/AllDatas/Tarifler/Kategoriler/ÖğrencilereÖzel").add(data);


    }
    

     /**
     * @param {ArrayBuffer} image
     * @returns {string} download url
     */
    uploadImage = async (image: ArrayBuffer) => {
        let date = new Date().getTime()
        let answer = await this.storageFirebase.ref('Tarif/' + date).put(image);
        return answer.ref.getDownloadURL();
    };


    /**
     * @return {firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>[]} arrayOfDocs all documents for HighCalori Recipes
     */
    getHighCalories = async() =>{
        let arrayOfDocs: Array<firebase.firestore.DocumentSnapshot>  =  (await this.firestoreInstance.collection("/BeslenmeApp/AllDatas/Tarifler/Kategoriler/YüksekKalorili").get()).docs;
        return arrayOfDocs;
    };

    /**
     * @return {firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>[]} arrayOfDocs all documents for HighCalori Recipes
     */
    getLowCalories = async() =>{
        let arrayOfDocs: Array<firebase.firestore.DocumentSnapshot>  =  (await this.firestoreInstance.collection("/BeslenmeApp/AllDatas/Tarifler/Kategoriler/DüşükKalorili").get()).docs;

        return arrayOfDocs;
        
    };


    /**
     * @return {firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>[]} arrayOfDocs all documents for HighCalori Recipes
     */
    getFitDeserts = async() =>{
        let arrayOfDocs: Array<firebase.firestore.DocumentSnapshot>  =  (await this.firestoreInstance.collection("/BeslenmeApp/AllDatas/Tarifler/Kategoriler/FitTatlılar").get()).docs;

        return arrayOfDocs;
        
    };


    /**
     * @return {firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>[]} arrayOfDocs all documents for HighCalori Recipes
     */
    getFastRecipes = async() =>{
        let arrayOfDocs: Array<firebase.firestore.DocumentSnapshot>  =  (await this.firestoreInstance.collection("/BeslenmeApp/AllDatas/Tarifler/Kategoriler/HızlıTarifler").get()).docs;

        return arrayOfDocs;
        
    };


    /**
     * @return {firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>[]} arrayOfDocs all documents for HighCalori Recipes
     */
    getLookingNew = async() =>{
        let arrayOfDocs: Array<firebase.firestore.DocumentSnapshot>  =  (await this.firestoreInstance.collection("/BeslenmeApp/AllDatas/Tarifler/Kategoriler/DeğişiklikArayanlar").get()).docs;

        return arrayOfDocs;
        
    };

    /**
     * @return {firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>[]} arrayOfDocs all documents for HighCalori Recipes
     */
    getStudentRecipe = async() =>{
        let arrayOfDocs: Array<firebase.firestore.DocumentSnapshot>  =  (await this.firestoreInstance.collection("/BeslenmeApp/AllDatas/Tarifler/Kategoriler/ÖğrencilereÖzel").get()).docs;

        return arrayOfDocs;
        
    };

  

    /**
     * @param {firebase.firestore.DocumentSnapshot} data this is the DocumentSnapshot for individual recipes.
     * @returns {details} all necessary datas for deleting updating a document
     */
    getDetailsOfDocument = ( data: firebase.firestore.DocumentSnapshot) => {
        

        return {
            nameOfRecipe: data.data()!.Tarifinİsmi,
            personWhoCooks: data.data()!.YapanKişi,
            DocumentReference: data.ref,
        } as details;
       

    };


    /**
     * @param {firebase.firestore.DocumentReference} documentReference the reference of a specific document
     */
    deleteRecipe = async(documentReference: firebase.firestore.DocumentReference)=>{
        let urlImage: string = (await documentReference.get()).data()!.Resim;
        await firebase.storage().refFromURL(urlImage).delete();
        await documentReference.delete();
    };
}
