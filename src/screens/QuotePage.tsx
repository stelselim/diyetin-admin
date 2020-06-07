import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import BForm from 'react-bootstrap/Form';
import BFormGroup from 'react-bootstrap/FormGroup';
import * as Yup from 'yup';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import { Formik, Field, Form } from 'formik';
import { QuoteOfDay } from '../backend/FirebaseQuoteOfDay';
import firebase from 'firebase';

const valSchema = Yup.object().shape({
    description: Yup.string()
        .min(2)
        .max(300)
        .required('Boş bırakılamaz'),
});

interface Props extends RouteComponentProps { }

interface State {
    quotes: Array<string>,
    user: {
        description: string;
    };
}

class QuoteOfDayPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            quotes: [],
            user: {
                description: '',
            },
        };
    }
    async getQuotes() {
        let snap = await firebase.firestore().doc("/BeslenmeApp/AllDatas/GününSözü/doc").get();
        //@ts-ignore
        let quotes = snap.data().sözler;
        this.setState({ quotes:quotes });
        
    }

    componentDidMount() {
        this.getQuotes();
    }


    render() {
        return (
            <Container>
                <Formik
                    initialValues={this.state.user}
                    onSubmit={async (values, actions) => {
                        console.log('submit');
                        actions.setSubmitting(false);
                        console.log(values);
                        try {
                            let QOD = new QuoteOfDay();
                            let res = await QOD.addNewQuote(values.description);
                            console.log(res);
                            this.props.history.push('/');
                        } catch (e) {
                            console.log(e);
                        }
                    }}
                    validationSchema={valSchema}
                    render={(formikBag) => (
                        <Form>
                            <Field
                                name="description"
                                //@ts-ignore
                                render={({ field, form, meta }) => (
                                    <BFormGroup>
                                        <BForm.Control
                                            as="textarea"
                                            autoComplete="off"
                                            rows="8"
                                            type="text"
                                            {...field}
                                            placeholder="Detay"
                                        />
                                        {meta.touched && meta.error && <div className="text-danger">{meta.error}</div>}
                                    </BFormGroup>
                                )}
                            />
                            <Row style={{ justifyContent: 'center' }}>
                                <Button onClick={() => console.log('press')} type="submit">
                                    Gönder
                                </Button>
                            </Row>
                        </Form>
                    )}
                />
                <div style={{ height: 30 }} />
                <ul>
                    {this.state.quotes.map((i) => {
                        console.log(i);
                        let qu = i;
                        return (
                            <li>
                                {qu}
                            </li>
                        );
                    })}
                </ul>
                <div style={{ height: 30 }} />
            </Container>
        );
    }
}

export default withRouter(QuoteOfDayPage);
