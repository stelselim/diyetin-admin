import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import BForm from 'react-bootstrap/Form';
import BFormGroup from 'react-bootstrap/FormGroup';
import * as Yup from 'yup';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import { Formik, Field, Form } from 'formik';
import { FirebaseRecipe } from '../backend/FirebaseRecipe';
const toArrayBuffer = require('to-array-buffer');

const valSchema = Yup.object().shape({
    title: Yup.string()
        .min(2)
        .max(70)
        .required('Boş bırakılamaz'),
    ingredients: Yup.string()
        .min(2)
        .required('Boş bırakılamaz'),
    howToCook: Yup.string()
        .min(2)
        .required('Boş bırakılamaz'),
    protein: Yup.number()
        .min(0)
        .required('Boş bırakılamaz'),
    carb: Yup.number()
        .min(0)
        .required('Boş bırakılamaz'),
    fat: Yup.number()
        .min(0)
        .required('Boş bırakılamaz'),
    calorie: Yup.number()
        .min(0)
        .required('Boş bırakılamaz'),
    servingSize: Yup.string()
        .min(0)
        .required('Boş bırakılamaz'),
    nameSurname: Yup.string()
        .min(0)
        .required('Boş bırakılamaz'),
    type: Yup.string()
        .min(1)
        .required("Boş bıraklılamaz"),
    image: Yup.mixed().required('Boş bırakılamaz'),
});

interface Props extends RouteComponentProps { }

interface State {
}

class DeleteRecipePage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
        };
    }


    getBase64 = (file: File): Promise<string> => {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = function () {
                resolve(reader.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file as Blob);
        });
    };

    renderRecipe = (data: Array<any>, title: string) => {
        return (data.map((i) => {
            return (
                <div>{JSON.stringify(i)}</div>
            );
        }))
    }

    renderItems = async () => {
        console.log('renderitems')
        let rec = new FirebaseRecipe()
        let dataFast = await rec.getFastRecipes()
        console.log(dataFast)
        let dataFit = await rec.getFitDeserts()
        let dataHigh = await rec.getHighCalories()
        let dataLooking = await rec.getLookingNew()
        let dataLow = await rec.getLowCalories()
        let dataStudent = await rec.getStudentRecipe()
        return (
            <Container>
                <div>Hızlı Tarifler</div>
            </Container>
        )
    }

    render() {
        console.log('render')
        return (
            <Container>
                {this.renderItems()}
            </Container>
        );
    }
}

export default withRouter(DeleteRecipePage);
