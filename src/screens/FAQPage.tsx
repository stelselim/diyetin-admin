import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import BForm from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import BFormGroup from 'react-bootstrap/FormGroup';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Yup from 'yup';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import { Formik, Field, Form } from 'formik';
import { FirebaseAuth } from '../backend/FirebaseAuth';
import { FirebaseFAQ } from '../backend/FirebaseFAQ';
const toArrayBuffer = require('to-array-buffer');

const valSchema = Yup.object().shape({
    title: Yup.string()
        .min(2)
        .max(80)
        .required('Boş bırakılamaz'),
    description: Yup.string()
        .min(2)
        .max(1000)
        .required('Boş bırakılamaz'),
    resource: Yup.string()
        .min(2)
        .required('Boş bırakılamaz'),
    type: Yup.string()
        .min(1).max(100)
        .required('Boş bırakılamaz')
});

interface Props extends RouteComponentProps { }

interface State {
    user: {
        title: string;
        description: string;
        resource: string;
        type: string;
    };
}

class FAQPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            user: {
                title: '',
                description: '',
                resource: '',
                type: 'FalseKnownTrue'
            },
        };
    }

    render() {
        return (
            <Container>
                <Formik
                    initialValues={this.state.user}
                    onSubmit={async (values, actions) => {
                        console.log('submit')
                        actions.setSubmitting(false);
                        console.log(values)
                        try {
                            let FAQ = new FirebaseFAQ();
                            let res;
                            if (values.type === 'FalseKnownTrue') {
                                res = await FAQ.AddFalseKnownTrue(values.title, values.description, values.resource);
                            }
                            else if (values.type === 'AddGainWeight') {
                                res = await FAQ.AddGainWeight(values.title, values.description, values.resource);
                            }
                            else if (values.type === 'AddHealthLife') {
                                res = await FAQ.AddHealthLife(values.title, values.description, values.resource);
                            }
                            else if (values.type === 'AddInterestingFacts') {
                                res = await FAQ.AddInterestingFacts(values.title, values.description, values.resource);
                            }
                            else if (values.type === 'AddLoseWeight') {
                                res = await FAQ.AddLoseWeight(values.title, values.description, values.resource);
                            }
                            else
                                throw "Wrong type";
                            if (FAQ === null)
                                throw 'Error with upload';
                            console.log(res)
                            this.props.history.push('/');
                        } catch (e) {
                            console.log(e);
                        }
                    }}
                    validationSchema={valSchema}
                    render={(formikBag) => (
                        <Form>
                            <Field
                                name="type"
                                //@ts-ignore
                                render={({ field, form, meta }) => {
                                    return (
                                        <BFormGroup>
                                            <BForm.Label>Example select</BForm.Label>
                                            <BForm.Control
                                                as="select"
                                                {...field}
                                                placeholder="Başlık (Max 80 karakter)"
                                            >
                                                <option value="AddGainWeight">Kilo Alma</option>
                                                <option value="AddLoseWeight">Kilo Verme</option>
                                                <option value="AddHealthLife">Sağlıklı Yaşam</option>
                                                <option value="FalseKnownTrue">Doğru Bilinen Yanlışlar</option>
                                                <option value="AddInterestingFacts">Şaşırtıcı Bilgiler</option>
                                            </BForm.Control>
                                            {meta.touched && meta.error && <div className="text-danger">{meta.error}</div>}
                                        </BFormGroup>
                                    );
                                }}
                            />
                            <Field
                                name="title"
                                //@ts-ignore
                                render={({ field, form, meta }) => {
                                    return (
                                        <BFormGroup>
                                            <BForm.Control
                                                type="text"
                                                autoComplete="off"
                                                {...field}
                                                placeholder="Başlık (Max 80 karakter)"
                                            />
                                            {meta.touched && meta.error && <div className="text-danger">{meta.error}</div>}
                                        </BFormGroup>
                                    );
                                }}
                            />
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
                            <Field
                                name="resource"
                                //@ts-ignore
                                render={({ field, form, meta }) => (
                                    <BFormGroup>
                                        <BForm.Control
                                            as="textarea"
                                            autoComplete="off"
                                            rows="2"
                                            type="text"
                                            {...field}
                                            placeholder="Kaynak"
                                        />
                                        {meta.touched && meta.error && <div className="text-danger">{meta.error}</div>}
                                    </BFormGroup>
                                )}
                            />
                            <Row style={{ justifyContent: 'center' }}>
                                <Button
                                    onClick={() => console.log('press')}
                                    type="submit">Gönder</Button>
                            </Row>
                        </Form>
                    )}
                />
            </Container>
        );
    }
}

export default withRouter(FAQPage);
