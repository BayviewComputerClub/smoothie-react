import React, {Component} from "react";
import {
    Button,
    Modal,
    TextInput,
    Spinner
} from "@patternfly/react-core";

import { Formik, Form, Field, ErrorMessage } from 'formik';

import {login} from "../api/Auth";
import {AuthContext} from "../contexts/AuthContext";

class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errMsg: ""
        }
    }

    render() {
        return (
            <Modal
                isSmall
                title="Login"
                isOpen={this.context.loginModal}
                onClose={() => this.context.setState({loginModal: false})}
                isFooterLeftAligned
            >
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.username) {
                            errors.username = 'Required';
                        }
                        return errors;
                    }}
                    onSubmit={async (values, {setErrors}) => {
                        if(await login(values.username, values.password)) {
                            this.context.setState({loginModal: false, loggedIn: true, username: values.username});
                        } else {
                            setErrors({username: "Incorrect username/password!"});
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <ErrorMessage name="username" component="div" />
                            <Field type="text" name="username" placeholder="Username" className={"pf-c-form-control"} />
                            <br /><br />
                            <Field type="password" name="password" placeholder="Password" className={"pf-c-form-control"} />
                            <ErrorMessage name="password" component="div" />
                            <br /><br />
                            {isSubmitting ? <Spinner size="lg"/> :
                                <Button type="submit" disabled={isSubmitting}>
                                    Login
                                </Button>
                            }

                        </Form>
                    )}
                </Formik>
            </Modal>
        );
    }

}
LoginModal.contextType = AuthContext;
export default LoginModal;
