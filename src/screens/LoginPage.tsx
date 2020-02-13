import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {
    Formik,
    Field,
    Form
} from 'formik';

interface Props extends RouteComponentProps {

}

interface State {
    user: {
        username: string,
        password: string
    };
}



export class LoginPage extends Component<Props, State>{

    constructor(props: Props) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: ''
            }
        }
    }

    render() {
        return (
            <Container>
                <Formik
                    initialValues={this.state.user}
                    onSubmit={(values, actions) => {
                        actions.setSubmitting(false);
                        this.setState({user: {username: values.username, password: values.password}});
                        alert(JSON.stringify(values, null, 2));
                        this.props.history.push('/homepage')
                    }}
                    render={formikBag => (
                        <Form>
                            <Field
                                name="username"
                                //@ts-ignore
                                render={({ field, form, meta }) => (
                                    <div>
                                        <input type="text" {...field} placeholder="username" />
                                        {meta.touched && meta.error && meta.error}
                                    </div>
                                )}
                            />
                            <Field
                                name="password"
                                //@ts-ignore
                                render={({ field, form, meta }) => (
                                    <div>
                                        <input type="password" {...field} placeholder="password" />
                                        {meta.touched && meta.error && meta.error}
                                    </div>
                                )}
                            />
                            <Button type="submit">
                                Gönder
                            </Button>
                        </Form>
                    )}
                />
            </Container>
        );
    }
}

export default withRouter(LoginPage);
