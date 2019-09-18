import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import CustomWysiwyg from "../../utils/CustomWysiwyg";
import TextField from '@material-ui/core/TextField';
import CustomMaterialButton from "../../utils/CustomMaterialButton";
import {FormControlLabel} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";

class Form extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        error: PropTypes.string
    };

    renderField = data => {
        data.input.className = 'form-control';

        const isInvalid = data.meta.touched && !!data.meta.error;
        if (isInvalid) {
            data.input.className += ' is-invalid';
            data.input['aria-invalid'] = true;
        }

        if (this.props.error && data.meta.touched && !data.meta.error) {
            data.input.className += ' is-valid';
        }

        return (
            <div className={`form-group`}>
                <label
                    htmlFor={`project_${data.input.name}`}
                    className="form-control-label d-none"
                >
                    {data.input.name}
                </label>
                <TextField
                    {...data.input}
                    type={data.type}
                    step={data.step}
                    required={data.required}
                    label={data.label}
                    placeholder={data.placeholder}
                    id={`project_${data.input.name}`}
                />

              {isInvalid && <div className="invalid-feedback">{data.meta.error}</div>}
            </div>
        );
    };

    renderCheckbox = ({ input, label }) => (
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={input.value ? true : false}
              onChange={input.onChange}
            />
          }
          label={label}
        />
      </div>
    )

    render() {
      const categories = [
        'Solidarité',
        'Écologie',
        'Mode & design',
        'Artisanat',
        'Alimentation',
        'Agriculture',
        'Musique',
        'Sport',
        'Technologie',
        'Art & photo',
        'Patrimoine',
        'Livres',
        'BD',
        'Santé & éducation',
        'Films & vidéo',
        'Jeux',
        'Journalisme',
        'Théâtre & danse'
      ];

        return (
          <form onSubmit={this.props.handleSubmit} className={'d-flex flex-column'}>
            <Field
              component={this.renderField}
              name="pitch"
              type="text"
              placeholder=""
              label="Pitch"
              required={true}
            />
            <div className="mt-3">
              <Field
                component={CustomWysiwyg}
                name="description"
                type="text"
                placeholder=""
                label="Description complète"
                required={true}
              />
            </div>

            <div className="d-flex flex-wrap mt-3">
              {categories.map(categorie => (
                <div>
                  <Field name={'category-' + categorie} component={this.renderCheckbox} label={categorie} />
                </div>
              ))}
            </div>

            <div className="mt-3">
              <CustomMaterialButton type="submit" color={'primary'} text={'Initier'}/>
            </div>
          </form>
        );
    }
}

export default reduxForm({
  form: 'project',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(Form);
