import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { fetch } from '../../services/dataAccess';
import { authentication } from '../../services/authentication';
import { TextField } from 'formik-material-ui';
import {
  LinearProgress,
} from '@material-ui/core';
import CustomMaterialButton from "../../utils/CustomMaterialButton";
import {setAuthenticated} from "../../actions/authentication";
import {connect} from "react-redux";
import {retrieve} from "../../actions/user/show";
import Radio from "@material-ui/core/Radio";
import Typography from "@material-ui/core/Typography";
const activitySector = [
  'Technique',
  'Design',
  'Juridique',
  'Manuel',
  "Communication",
  "Marketing"
];

const radioButton = (props) => {
  return(<Radio
    name={props.field.name}
    onChange={props.field.onChange}
    value={props.field.value}
    inputProps={{ 'aria-label': props.field.value }}
  />)
};

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
                        mainSkill: '',
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
                        fetch('/users', { method: 'POST', body: JSON.stringify(fields, ['firstName', 'lastName', 'email', 'password', 'mainSkill'], 4)  })
                            .then((response) => {
                                authentication.login(fields.email, fields.password)
                                    .then(
                                        user => {
                                            setSubmitting(false);
                                            resetForm(initialValues);
                                            this.props.history.push('/');
                                            this.props.setAuthenticated(true);
                                            this.props.retrieve(authentication.currentUserValue['@id']);
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
                            <Typography variant="h6" gutterBottom={true}>
                              Compétence principale
                            </Typography>
                          <div>
                            <div>
                              <div>
                                {activitySector.map((sector, index) => (
                                      <label key={index}>
                                        <Field name="mainSkill" component={radioButton} type="radio" value={sector} />{' '}
                                        {sector}
                                      </label>
                                    )
                                )}
                              </div>
                            </div>
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
const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  retrieve: id => dispatch(retrieve(id)),
  setAuthenticated: boolean => dispatch(setAuthenticated(boolean))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
