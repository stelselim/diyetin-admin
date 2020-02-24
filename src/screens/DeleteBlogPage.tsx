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
import { FirebaseRecipe, details } from '../backend/FirebaseRecipe';
import { FirebaseBlogOperations } from '../backend/FirebaseBlog';
const toArrayBuffer = require('to-array-buffer');

interface Props extends RouteComponentProps { }

interface State {
    data: Array<firebase.firestore.DocumentSnapshot>,
}

class DeleteRecipePage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            data: []
        };
    }

    async componentDidMount() {
        await this.getItems()
    }
  


    getItems = async () => {
        let rec = new FirebaseBlogOperations()
        let data = await rec.getBlogDocs()
        this.setState({ data });
    }

    render() {
        return (
            <Container>
                <div>Bloglar</div>
                <ul>
                    {this.state.data.map((i) => {
                        let rec = new FirebaseBlogOperations()
                        let data = rec.getDetailsOfDocument(i);
                        return (
                            <li>Blog İsmi: {data.title}{'\n'} Yazar: {data.author} <FaTrash onClick={async () => {
                                let answer = window.confirm("Delete data?")
                                console.log(answer);
                                if (answer)
                                    await rec.deleteBlogPost(data.DocumentReference);
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
