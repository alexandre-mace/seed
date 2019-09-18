import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { authentication } from '../../services/authentication';
import { TextField } from 'formik-material-ui';
import {
    LinearProgress,
} from '@material-ui/core';
import {AppContext} from "../../utils/AppContext";
import { withRouter } from 'react-router'
import CustomMaterialButton from "../../utils/CustomMaterialButton";

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render() {
        return(
            <div className="">
                <span className="h2">Se connecter</span>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().required('L\'email est requis'),
                        password: Yup.string().required('Le mot de passe est requis')
                    })}
                    onSubmit={({ email, password }, { setStatus, setSubmitting }) => {
                        setStatus();
                        authentication.login(email, password)
                            .then(
                                () => {
                                    setSubmitting(false);
                                    this.context.updateCurrentUser();
                                    this.props.history.push('/')
                                },
                                error => {
                                    setSubmitting(false);
                                    setStatus(error);
                                }
                            );
                    }}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <Field component={TextField} name="email" margin='normal' type="text" label="Votre email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            </div>
                            <div className="form-group">
                                <Field component={TextField} name="password" margin='normal' type="password" label="Votre mot de passe" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            </div>
                            <div className="form-group">
                                {isSubmitting ? (
                                    <LinearProgress/>
                                ) : (
                                  <CustomMaterialButton type="submit" text={'Se connecter'} color={'primary'}/>
                                )}
                            </div>

                        </Form>
                    )}
                />
            </div>
        );
    }
}
export default withRouter(Login);
Login.contextType = AppContext;

