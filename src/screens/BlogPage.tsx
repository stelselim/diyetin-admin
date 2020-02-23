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
import { FirebaseBlogOperations } from '../backend/FirebaseBlog';
const toArrayBuffer = require('to-array-buffer');

const valSchema = Yup.object().shape({
    title: Yup.string()
        .min(2)
        .max(80)
        .required('Boş bırakılamaz'),
    description: Yup.string()
        .min(2)
        .required('Boş bırakılamaz'),
    topic: Yup.string()
        .min(2)
        .required('Boş bırakılamaz'),
    resource: Yup.string()
        .min(2)
        .required('Boş bırakılamaz'),
    writer: Yup.string()
        .min(2)
        .required('Boş bırakılamaz'),
    image: Yup.mixed().required('Boş bırakılamaz'),
});

interface Props extends RouteComponentProps {}

interface State {
    user: {
        title: string;
        description: string;
        topic: string;
        resource: string;
        writer: string;
        image: File | null;
        imagepreview: string;
    };
}

class AddBlogPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            user: {
                title: '',
                description: '',
                topic: '',
                resource: '',
                writer: '',
                image: null,
                imagepreview: '',
            },
        };
    }

    getBase64 = (file: File): Promise<string> => {
        return new Promise(function(resolve, reject) {
            var reader = new FileReader();
            reader.onload = function() {
                resolve(reader.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file as Blob);
        });
    };

    render() {
        console.log(toArrayBuffer);
        return (
            <Container>
                <Formik
                    initialValues={this.state.user}
                    onSubmit={async (values, actions) => {
                        actions.setSubmitting(false);
                        try {
                            let blog = new FirebaseBlogOperations();
                            let base64 = await this.getBase64(values.image!);
                            console.log(base64);
                            let convert = toArrayBuffer(base64);
                            console.log(convert);
                            const resimg = await blog.uploadImage(convert);
                            console.log(resimg);
                            if (resimg === null) throw 'Error with image upload';
                            const resadd = await blog.addNewBlog(
                                values.title,
                                values.resource,
                                resimg,
                                values.topic,
                                values.description,
                                values.writer
                            );
                            console.log(resadd);
                            this.props.history.push('/');
                        } catch (e) {
                            console.log(e);
                        }
                    }}
                    validationSchema={valSchema}
                    render={({ setFieldValue, values }) => (
                        <Form>
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
                                name="topic"
                                //@ts-ignore
                                render={({ field, form, meta }) => (
                                    <BFormGroup>
                                        <BForm.Control
                                            as="textarea"
                                            autoComplete="off"
                                            rows="3"
                                            type="text"
                                            {...field}
                                            placeholder="Ana Fikir"
                                        />
                                        {meta.touched && meta.error && <div className="text-danger">{meta.error}</div>}
                                    </BFormGroup>
                                )}
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
                            <Row style={{ justifyContent: 'space-evenly' }}>
                                <Field
                                    name="writer"
                                    //@ts-ignore
                                    render={({ field, form, meta }) => (
                                        <BFormGroup>
                                            <BForm.Control type="text" autoComplete="off" {...field} placeholder="Yazar" />
                                            {meta.touched && meta.error && <div className="text-danger">{meta.error}</div>}
                                        </BFormGroup>
                                    )}
                                />
                                <Field name="image">
                                    {({ field, form, meta }: any) => {
                                        return (
                                            <BFormGroup>
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">Upload</span>
                                                    </div>
                                                    <div className="custom-file">
                                                        <input
                                                            name="image"
                                                            onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                                                                console.log(event.currentTarget.files![0]);
                                                                setFieldValue('image', event.currentTarget.files![0]);
                                                                let { user } = this.state;
                                                                user.imagepreview = await this.getBase64(event.currentTarget.files![0]);
                                                                this.setState({
                                                                    user,
                                                                });
                                                            }}
                                                            type="file"
                                                            accept="image/*"
                                                            className="custom-file-input"
                                                        />
                                                        <label className="custom-file-label">
                                                            {values.image !== null ? values.image.name : 'Fotoğraf'}
                                                        </label>
                                                    </div>
                                                </div>
                                                {meta.touched && meta.error && <div className="text-danger">{meta.error}</div>}
                                            </BFormGroup>
                                        );
                                    }}
                                </Field>
                            </Row>
                            {this.state.user.imagepreview === '' ? (
                                <div />
                            ) : (
                                <Container style={{ textAlign: 'center' }}>
                                    <Image
                                        style={{
                                            width: '15rem',
                                            height: '15rem',
                                        }}
                                        src={this.state.user.imagepreview}
                                    />
                                </Container>
                            )}
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
