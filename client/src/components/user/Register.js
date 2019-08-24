import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { fetch } from '../../services/dataAccess';
import { authentication } from '../../services/authentication';
import { TextField } from 'formik-material-ui';
import {
    LinearProgress,
} from '@material-ui/core';
import { withRouter } from 'react-router'
import {AppContext} from "../../utils/AppContext";
import CustomMaterialButton from "../../utils/CustomMaterialButton";

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        };
    }

    render() {
        return(
            <div className="">
                <span className="h2">Rejoindre la plateforme</span>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    validationSchema={Yup.object().shape({
                        firstName: Yup.string()
                            .required('Le prénom est requis'),
                        lastName: Yup.string()
                            .required('Le nom est requis'),
                        email: Yup.string()
                            .email('L\'addresse email est invalide')
                            .required('L\'email est requis'),
                        password: Yup.string()
                            .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
                            .required('Le mot de passe est requis'),
                        confirmPassword:  Yup.string()
                            .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
                            .required('Le mot de passe de confirmation est requis')
                    })}
                    onSubmit={(fields, { setStatus, setSubmitting, setErrors, resetForm }, initialValues) => {
                        setStatus();
                        fetch('http://localhost:8080/users', { method: 'POST', body: JSON.stringify(fields, ['firstName', 'lastName', 'email', 'password'], 4)  })
                            .then((response) => {
                                authentication.login(fields.email, fields.password)
                                    .then(
                                        user => {
                                            this.context.updateCurrentUser();
                                            setSubmitting(false);
                                            resetForm(initialValues);
                                            this.props.history.push('/')
                                        },
                                        error => {
                                            setSubmitting(false);
                                            setStatus(error);
                                        }
                                    );
                            })
                            .catch(e => {
                                console.log(e.errors);
                                setErrors(e.errors);
                                setSubmitting(false);
                            });
                    }}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <Field component={TextField} label="Prénom" margin="normal" fullWidth name="firstName" type="text" />
                                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <Field component={TextField} label="Nom" margin="normal" fullWidth name="lastName" type="text" />
                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <Field component={TextField} label="Email" margin="normal" fullWidth name="email" type="text" />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <Field component={TextField} label="Mot de passe" margin="normal" fullWidth name="password" type="password" />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <Field component={TextField} label="Confirmez le mot de passe" margin="normal" fullWidth name="confirmPassword" type="password" />
                                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                {isSubmitting ? (
                                    <LinearProgress/>
                                ) : (
                                    <>
                                      <CustomMaterialButton type="submit" text={'Rejoindre'} color={'primary'}/>
                                    {/*<button type="reset" className=" btn-secondary form-btn">Réinitialiser</button>*/}
                                    </>
                                )}
                            </div>
                        </Form>
                    )}
                />
            </div>
        );
    }
}
export default withRouter(Register);
Register.contextType = AppContext;

