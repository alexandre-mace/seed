import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import CustomMaterialButton from "../../utils/CustomMaterialButton";

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
          htmlFor={`message_${data.input.name}`}
          className="form-control-label d-none"
        >
          {data.input.name}
        </label>
        <TextField
          {...data.input}
          type={data.type}
          step={data.step}
          label={data.label}
          required={data.required}
          placeholder={data.placeholder}
          id={`message_${data.input.name}`}
        />
        {isInvalid && <div className="invalid-feedback">{data.meta.error}</div>}
      </div>
    );
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit} className="d-flex flex-column flex-md-row align-items-center mb-3">
        <div className="w-100">
          <Field
            component={this.renderField}
            name="content"
            type="text"
            placeholder=""
            label="Ajouter un message"
            required={true}
          />
        </div>
        <div className="ml-3 mt-2">
          <CustomMaterialButton type="submit" color={'primary'} text={'Poster'}/>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'message',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(Form);
