import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import BForm from 'react-bootstrap/Form';
import BFormGroup from 'react-bootstrap/FormGroup';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Yup from 'yup';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import { Formik, Field, Form } from 'formik';
import { FirebaseAuth } from '../backend/FirebaseAuth';

const valSchema = Yup.object().shape({
    title: Yup.string()
        .min(2)
        .max(100)
        .required('required'),
    description: Yup.string()
        .min(2)
        .max(100)
        .required('required'),
});

interface Props extends RouteComponentProps {}

interface State {
    user: {
        title: string;
        description: string;
    };
}

class AddBlogPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            user: {
                title: '',
                description: '',
            },
        };
    }

    render() {
        return (
            <Container>
                <Formik
                    initialValues={this.state.user}
                    onSubmit={async (values, actions) => {
                        actions.setSubmitting(false);
                        try {
                            console.log(values);
                            this.props.history.push('/');
                        } catch (e) {
                            console.log(e);
                        }
                    }}
                    validationSchema={valSchema}
                    render={(formikBag) => (
                        <Form>
                            <Field
                                name="title"
                                //@ts-ignore
                                render={({ field, form, meta }) => {
                                    return (
                                        <BFormGroup>
                                            <BForm.Control
                                                type="text"
                                                {...field}
                                                placeholder="Başlık"
                                            />
                                            {meta.touched && meta.error && (
                                                <div className="text-danger">
                                                    {meta.error}
                                                </div>
                                            )}
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
                                            rows="6"
                                            type="text"
                                            {...field}
                                            placeholder="Detay"
                                        />
                                        {meta.touched && meta.error && (
                                            <div className="text-danger">
                                                {meta.error}
                                            </div>
                                        )}
                                    </BFormGroup>
                                )}
                            />
                            <Row style={{ justifyContent: 'center' }}>
                                <Button type="submit">Gönder</Button>
                            </Row>
                        </Form>
                    )}
                />
            </Container>
        );
    }
}

export default withRouter(AddBlogPage);
