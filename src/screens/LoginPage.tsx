import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import BForm from 'react-bootstrap/Form';
import BFormGroup from 'react-bootstrap/FormGroup';
import { User, setUser } from '../reducer/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Yup from 'yup';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import { Formik, Field, Form } from 'formik';
import { FirebaseAuth } from '../backend/FirebaseAuth';

const valSchema = Yup.object().shape({
    username: Yup.string()
        .min(2)
        .max(100)
        .required('required'),
    password: Yup.string()
        .min(2)
        .max(100)
        .required('required'),
});

interface Props extends RouteComponentProps {
    setUser: typeof setUser;
}

interface State {
    user: {
        username: string;
        password: string;
    };
}

class LoginPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: '',
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
                        this.setState({
                            user: {
                                username: values.username,
                                password: values.password,
                            },
                        });
                        let auth = new FirebaseAuth();
                        try {
                            const res = await auth.loginWithEmailAndPassword(values.username, values.password);
                            if (res === null) throw new Error('Not a valid user');
                            localStorage.setItem('username', values.username);
                            this.props.setUser({
                                username: values.username,
                                firebaseuser: res!,
                            });
                            this.props.history.push('/');
                        } catch (e) {
                            console.log(e);
                        }
                    }}
                    validationSchema={valSchema}
                    render={(formikBag) => (
                        <Form>
                            <Field
                                name="username"
                                //@ts-ignore
                                render={({ field, form, meta }) => {
                                    return (
                                        <BFormGroup>
                                            <BForm.Control type="text" autoComplete="off" {...field} placeholder="Username" />
                                            {meta.touched && meta.error && <div className="text-danger">{meta.error}</div>}
                                        </BFormGroup>
                                    );
                                }}
                            />
                            <Field
                                name="password"
                                //@ts-ignore
                                render={({ field, form, meta }) => (
                                    <BFormGroup>
                                        <BForm.Control type="password" autoComplete="off" {...field} placeholder="Password" />
                                        {meta.touched && meta.error && <div className="text-danger">{meta.error}</div>}
                                    </BFormGroup>
                                )}
                            />
                            <Row style={{ justifyContent: 'center' }}>
                                <Button type="submit">Login</Button>
                            </Row>
                        </Form>
                    )}
                />
            </Container>
        );
    }
}

interface StateRedux {
    user: User;
}

const mapStateToProps = (state: StateRedux) => {
    const { user } = state;
    return { user };
};

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            setUser,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage));
