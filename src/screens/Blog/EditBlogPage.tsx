import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import BForm from 'react-bootstrap/Form';
import BFormGroup from 'react-bootstrap/FormGroup';
import * as Yup from 'yup';

import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { FaTrash, FaThumbsDown, FaEdit } from 'react-icons/fa'
import Row from 'react-bootstrap/Row';
import { Formik, Field, Form } from 'formik';
import { FirebaseRecipe, details } from '../../backend/FirebaseRecipe';
import { FirebaseBlogOperations } from '../../backend/FirebaseBlog';
import { deleteImage } from '../../backend/FirebaseStorage';

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
    image: Yup.mixed().notRequired(),
});
interface Props extends RouteComponentProps { }

interface State {
    data: Array<firebase.firestore.DocumentSnapshot>,
    showEditPanel: Boolean,
    toEditDocumentRef: any,
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

class EditBlogPost extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            toEditDocumentRef: null,
            data: [],
            showEditPanel: false,
            user: {
                title: '',
                description: '',
                topic: '',
                resource: '',
                writer: '',
                image: null,
                imagepreview: '',
            }
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



    render() {
        return (
            <Container>
                <div>Bloglar</div>
                <ul style={{ flexDirection: "column" }}>
                    {this.state.data.map((i) => {
                        let rec = new FirebaseBlogOperations()
                        let data = rec.getDetailsOfDocument(i);
                        return (
                            <li>Blog İsmi: {data.title}{'\n'} Yazar: {data.author}  {"----   "}
                                <FaEdit onClick={async () => {
                                    console.log("Hello");
                                    try {
                                        let local = await data.DocumentReference.get();
                                        let localData = local.data();
                                        console.log(localData);
                                        let localUser = {
                                            //@ts-ignore
                                            title: localData.Başlık,
                                            //@ts-ignore
                                            description: localData.BlogYazısı,
                                            //@ts-ignore
                                            topic: localData.AnaDüşünce,
                                            //@ts-ignore
                                            resource: localData.Kaynaklar,
                                            //@ts-ignore
                                            writer: localData.Yazar,
                                            image: null,
                                            imagepreview: '',
                                        }

                                        console.log(local.data());

                                        this.setState({
                                            toEditDocumentRef: data.DocumentReference,
                                            showEditPanel: true,
                                            user: localUser,
                                        });
                                    } catch (error) {
                                        console.log(error);
                                    }

                                }} />

                            </li>
                        );
                    })}
                </ul>


                {
                    this.state.showEditPanel ?
                        <div>

                            <Formik
                                initialValues={this.state.user}
                                onSubmit={async (values, actions) => {
                                    actions.setSubmitting(false);
                                    try {
                                        let snapshotData = await this.state.toEditDocumentRef.get();
                                        let blog = new FirebaseBlogOperations();
                                        let resimg = snapshotData.data().Resim;

                                        if (values.image === null) {
                                            resimg = snapshotData.data().Resim;


                                        } else {
                                            let base64 = await this.getBase64(values.image!);
                                            console.log(base64);
                                            let convert = toArrayBuffer(base64);
                                            console.log(convert);
                                            await deleteImage(resimg);
                                            resimg = await blog.uploadImage(convert);
                                        }


                                        console.log(resimg);

                                        await blog.updateBlogPost(
                                            resimg, values.title,
                                            values.topic, values.description, values.writer, values.resource,
                                            snapshotData
                                        );
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
                                            <Button type="submit">Kaydet</Button>
                                        </Row>
                                        <div style={{ height: 40 }} />
                                    </Form>

                                )}

                            />


                        </div>
                        :
                        <div />


                }

            </Container>
        );
    }
}


export default withRouter(EditBlogPost);
