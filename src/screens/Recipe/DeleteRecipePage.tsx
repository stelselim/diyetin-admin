import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import BForm from 'react-bootstrap/Form';
import BFormGroup from 'react-bootstrap/FormGroup';
import * as Yup from 'yup';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { FaTrash, FaThumbsDown } from 'react-icons/fa'
import Row from 'react-bootstrap/Row';
import { Formik, Field, Form } from 'formik';
import { FirebaseRecipe, details } from '../../backend/FirebaseRecipe';
const toArrayBuffer = require('to-array-buffer');

interface Props extends RouteComponentProps { }

interface State {
    dataFast: Array<firebase.firestore.DocumentSnapshot>,
    dataFit: Array<firebase.firestore.DocumentSnapshot>,
    dataHigh: Array<firebase.firestore.DocumentSnapshot>,
    dataLooking: Array<firebase.firestore.DocumentSnapshot>,
    dataLow: Array<firebase.firestore.DocumentSnapshot>,
    dataStudent: Array<firebase.firestore.DocumentSnapshot>
}

class DeleteRecipePage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            dataFast: [],
            dataFit: [],
            dataHigh: [],
            dataLooking: [],
            dataLow: [],
            dataStudent: []
        };
    }

    async componentDidMount() {
        await this.getItems()
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

    getItems = async () => {
        let rec = new FirebaseRecipe()
        let dataFast = await rec.getFastRecipes()
        let dataFit = await rec.getFitDeserts()
        let dataHigh = await rec.getHighCalories()
        let dataLooking = await rec.getLookingNew()
        let dataLow = await rec.getLowCalories()
        let dataStudent = await rec.getStudentRecipe()
        this.setState({ dataFit, dataStudent, dataLow, dataLooking, dataHigh, dataFast });
    }

    render() {
        return (
            <Container>
                <div>Fit Tatlılar</div>
                <ul>
                    {this.state.dataFit.map((i) => {
                        return (
                            <li>Tarifin İsmi: {i.data()!.Tarifinİsmi}{'\n'} Yazar: {i.data()!.YapanKişi} <FaTrash onClick={async () => {
                                let rec = new FirebaseRecipe()
                                let data = rec.getDetailsOfDocument(i);
                                let answer = window.confirm("Delete data?")
                                console.log(answer);
                                if (answer)
                                    await rec.deleteRecipe(data.DocumentReference);
                                this.props.history.replace("/")
                            }} /></li>
                        );
                    })}
                </ul>
                <div>Pratik Tarifler</div>
                <ul>
                    {this.state.dataFast.map((i) => {
                        return (
                            <li>Tarifin İsmi: {i.data()!.Tarifinİsmi}{'\n'} Yazar: {i.data()!.YapanKişi} <FaTrash onClick={async () => {
                                let rec = new FirebaseRecipe()
                                let data = rec.getDetailsOfDocument(i);
                                let answer = window.confirm("Delete data?")
                                console.log(answer);
                                if (answer)
                                    await rec.deleteRecipe(data.DocumentReference);
                                this.props.history.replace("/")
                            }} /></li>
                        );
                    })}
                </ul>
                <div>Yüksek Kalori</div>
                <ul>
                    {this.state.dataHigh.map((i) => {
                        return (
                            <li>Tarifin İsmi: {i.data()!.Tarifinİsmi}{'\n'} Yazar: {i.data()!.YapanKişi} <FaTrash onClick={async () => {
                                let rec = new FirebaseRecipe()
                                let data = rec.getDetailsOfDocument(i);
                                let answer = window.confirm("Delete data?")
                                console.log(answer);
                                if (answer)
                                    await rec.deleteRecipe(data.DocumentReference);
                                this.props.history.replace("/")
                            }} /></li>
                        );
                    })}
                </ul>
                <div>Düşük Kalori</div>
                <ul>
                    {this.state.dataLow.map((i) => {
                        return (
                            <li>Tarifin İsmi: {i.data()!.Tarifinİsmi}{'\n'} Yazar: {i.data()!.YapanKişi} <FaTrash onClick={async () => {
                                let rec = new FirebaseRecipe()
                                let data = rec.getDetailsOfDocument(i);
                                let answer = window.confirm("Delete data?")
                                console.log(answer);
                                if (answer)
                                    await rec.deleteRecipe(data.DocumentReference);
                                this.props.history.replace("/")
                            }} /></li>
                        );
                    })}
                </ul>
                <div>Değişklik Arayanlar</div>
                <ul>
                    {this.state.dataLooking.map((i) => {
                        return (
                            <li>Tarifin İsmi: {i.data()!.Tarifinİsmi}{'\n'} Yazar: {i.data()!.YapanKişi} <FaTrash onClick={async () => {
                                let rec = new FirebaseRecipe()
                                let data = rec.getDetailsOfDocument(i);
                                let answer = window.confirm("Delete data?")
                                console.log(answer);
                                if (answer)
                                    await rec.deleteRecipe(data.DocumentReference);
                                this.props.history.replace("/")
                            }} /></li>
                        );
                    })}
                </ul>
                <div>Öğrencilere Özel</div>
                <ul>
                    {this.state.dataStudent.map((i) => {
                        return (
                            <li>Tarifin İsmi: {i.data()!.Tarifinİsmi}{'\n'} Yazar: {i.data()!.YapanKişi} <FaTrash onClick={async () => {
                                let rec = new FirebaseRecipe()
                                let data = rec.getDetailsOfDocument(i);
                                let answer = window.confirm("Delete data?")
                                console.log(answer);
                                if (answer)
                                    await rec.deleteRecipe(data.DocumentReference);
                                this.props.history.replace("/")
                            }} /></li>
                        );
                    })}
                </ul>
            </Container>
        );
    }
}


export default withRouter(DeleteRecipePage);
