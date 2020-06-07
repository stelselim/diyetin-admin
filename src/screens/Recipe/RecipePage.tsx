import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import BForm from 'react-bootstrap/Form';
import BFormGroup from 'react-bootstrap/FormGroup';
import * as Yup from 'yup';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import { Formik, Field, Form } from 'formik';
import { FirebaseRecipe } from '../../backend/FirebaseRecipe';
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
    user: {
        title: string,
        ingredients: string,
        howToCook: string,
        calorie: string,
        protein: string,
        carb: string,
        type: string,
        image: File | null,
        fat: string,
        servingSize: string,
        imagepreview: string,
        nameSurname: string
    };
}

class RecipePage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            user: {
                type: 'addFastRecipe',
                title: '',
                calorie: '',
                carb: '',
                fat: '',
                imagepreview: '',
                image: null,
                howToCook: '',
                ingredients: '',
                nameSurname: '',
                protein: '',
                servingSize: ''
            },
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

    render() {
        return (
            <Container>
                <div style={{ flexDirection: "column", padding: 30 }}>
                    <Link style={{ color: 'red' }} to="delrecipe">
                        Tarifi Sil
                </Link>
                    {/* <div style={{ height: 30 }}> </div>

                    <Link style={{ color: 'blue' }} to="/editrecipe">
                        Tarifi Düzenle
                </Link> */}

                </div>

                <Formik
                    initialValues={this.state.user}
                    onSubmit={async (values, actions) => {
                        console.log('submit');
                        actions.setSubmitting(false);
                        console.log(values);
                        try {
                            let FR = new FirebaseRecipe();
                            let res;
                            let base64 = await this.getBase64(values.image!);
                            console.log(base64);
                            let convert = toArrayBuffer(base64);
                            console.log(convert);
                            const imgurl = await FR.uploadImage(convert);
                            console.log(imgurl);
                            if (imgurl === null) throw new Error('Error with image upload');
                            if (values.type === 'addFastRecipe') {
                                res = await FR.addFastRecipe(imgurl, values.title, values.ingredients, values.howToCook, parseInt(values.calorie), parseFloat(values.protein), parseFloat(values.carb), parseFloat(values.fat), values.servingSize, values.nameSurname);
                            } else if (values.type === 'addFitDesert') {
                                res = await FR.addFitDesert(imgurl, values.title, values.ingredients, values.howToCook, parseInt(values.calorie), parseFloat(values.protein), parseFloat(values.carb), parseFloat(values.fat), values.servingSize, values.nameSurname);
                            } else if (values.type === 'addHighCalorie') {
                                res = await FR.addHighCalorie(imgurl, values.title, values.ingredients, values.howToCook, parseInt(values.calorie), parseFloat(values.protein), parseFloat(values.carb), parseFloat(values.fat), values.servingSize, values.nameSurname);
                            } else if (values.type === 'addLookingNew') {
                                res = await FR.addLookingNew(imgurl, values.title, values.ingredients, values.howToCook, parseInt(values.calorie), parseFloat(values.protein), parseFloat(values.carb), parseFloat(values.fat), values.servingSize, values.nameSurname);
                            } else if (values.type === 'addLowCalorie') {
                                res = await FR.addLowCalorie(imgurl, values.title, values.ingredients, values.howToCook, parseInt(values.calorie), parseFloat(values.protein), parseFloat(values.carb), parseFloat(values.fat), values.servingSize, values.nameSurname);
                            } else if (values.type === 'addStudentRecipe') {
                                res = await FR.addStudentRecipe(imgurl, values.title, values.ingredients, values.howToCook, parseInt(values.calorie), parseFloat(values.protein), parseFloat(values.carb), parseFloat(values.fat), values.servingSize, values.nameSurname);
                            } else throw new Error('Wrong type');
                            console.log(res);
                            this.props.history.push('/');
                        } catch (e) {
                            console.log(e);
                        }
                    }}
                    validationSchema={valSchema}
                    render={({ setFieldValue, values }) => (
                        <Form>
                            <Field
                                name="type"
                                //@ts-ignore
                                render={({ field, form, meta }) => {
                                    return (
                                        <BFormGroup>
                                            <BForm.Label>Tarif Tipi</BForm.Label>
                                            <BForm.Control as="select" {...field} placeholder="Başlık (Max 80 karakter)">
                                                <option value="addFastRecipe">Pratik Tarif</option>
                                                <option value="addFitDesert">Fit Tatlı</option>
                                                <option value="addHighCalorie">Yüksek Kalori</option>
                                                <option value="addLookingNew">Değişiklik Arayanlar</option>
                                                <option value="addLowCalorie">Düşük Kalori</option>
                                                <option value="addStudentRecipe">Öğrencilere Özel</option>
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
                                                placeholder="Yemeğin İsmi"
                                            />
                                            {meta.touched && meta.error && <div className="text-danger">{meta.error}</div>}
                                        </BFormGroup>
                                    );
                                }}
                            />
                            <Field
                                name="ingredients"
                                //@ts-ignore
                                render={({ field, form, meta }) => {
                                    return (
                                        <BFormGroup>
                                            <BForm.Control
                                                type="text"
                                                autoComplete="off"
                                                {...field}
                                                placeholder="İçindekiler"
                                            />
                                            {meta.touched && meta.error && <div className="text-danger">{meta.error}</div>}
                                        </BFormGroup>
                                    );
                                }}
                            />
                            <Field
                                name="howToCook"
                                //@ts-ignore
                                render={({ field, form, meta }) => {
                                    return (
                                        <BFormGroup>
                                            <BForm.Control
                                                type="text"
                                                autoComplete="off"
                                                {...field}
                                                placeholder="Yapılışı"
                                            />
                                            {meta.touched && meta.error && <div className="text-danger">{meta.error}</div>}
                                        </BFormGroup>
                                    );
                                }}
                            />
                            <Field
                                name="calorie"
                                //@ts-ignore
                                render={({ field, form, meta }) => {
                                    return (
                                        <BFormGroup>
                                            <BForm.Control
                                                type="text"
                                                autoComplete="off"
                                                {...field}
                                                placeholder="Kalori"
                                            />
                                            {meta.touched && meta.error && <div className="text-danger">{meta.error}</div>}
                                        </BFormGroup>
                                    );
                                }}
                            />
                            <Field
                                name="protein"
                                //@ts-ignore
                                render={({ field, form, meta }) => {
                                    return (
                                        <BFormGroup>
                                            <BForm.Control
                                                type="text"
                                                autoComplete="off"
                                                {...field}
                                                placeholder="Protein"
                                            />
                                            {meta.touched && meta.error && <div className="text-danger">{meta.error}</div>}
                                        </BFormGroup>
                                    );
                                }}
                            />
                            <Field
                                name="carb"
                                //@ts-ignore
                                render={({ field, form, meta }) => {
                                    return (
                                        <BFormGroup>
                                            <BForm.Control
                                                type="text"
                                                autoComplete="off"
                                                {...field}
                                                placeholder="Karbonhidrat"
                                            />
                                            {meta.touched && meta.error && <div className="text-danger">{meta.error}</div>}
                                        </BFormGroup>
                                    );
                                }}
                            />
                            <Field
                                name="fat"
                                //@ts-ignore
                                render={({ field, form, meta }) => {
                                    return (
                                        <BFormGroup>
                                            <BForm.Control
                                                type="text"
                                                autoComplete="off"
                                                {...field}
                                                placeholder="Yağ"
                                            />
                                            {meta.touched && meta.error && <div className="text-danger">{meta.error}</div>}
                                        </BFormGroup>
                                    );
                                }}
                            />
                            <Field
                                name="servingSize"
                                //@ts-ignore
                                render={({ field, form, meta }) => {
                                    return (
                                        <BFormGroup>
                                            <BForm.Control
                                                type="text"
                                                autoComplete="off"
                                                {...field}
                                                placeholder="Porsiyon"
                                            />
                                            {meta.touched && meta.error && <div className="text-danger">{meta.error}</div>}
                                        </BFormGroup>
                                    );
                                }}
                            />
                            <Field
                                name="nameSurname"
                                //@ts-ignore
                                render={({ field, form, meta }) => (
                                    <BFormGroup>
                                        <BForm.Control
                                            autoComplete="off"
                                            type="text"
                                            {...field}
                                            placeholder="Ad Soyad"
                                        />
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
                                <Button onClick={() => console.log('press')} type="submit">
                                    Gönder
                                </Button>
                            </Row>
                        </Form>
                    )}
                />
            </Container>
        );
    }
}

export default withRouter(RecipePage);
