import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from './Form';
import { create, reset } from '../../actions/joindemand/create';
import {AppContext} from "../../utils/AppContext";
import {authentication} from "../../services/authentication";

class Create extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    created: PropTypes.object,
    create: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };
  static contextType = AppContext;

  componentWillUnmount() {
    this.props.reset();
  }

  handleSubmit = (values) => {
    values['demander'] = this.props.demander;
    values['project'] = this.props.project;
    values['status'] = this.props.status;

    this.props.create(values).then(() => {
      this.props.history.push('/confirmation-demande-joindre');
      this.props.retrieve(authentication.currentUserValue['@id'])
    })
  }

  render() {
    return (
      <div>
        {this.props.loading && (
          <div className="alert alert-info" role="status">
            Loading...
          </div>
        )}
        {this.props.error && (
          <div className="alert alert-danger" role="alert">
            <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
            {this.props.error}
          </div>
        )}

        <Form onSubmit={this.handleSubmit} values={this.props.item} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { created, error, loading } = state.joindemand.create;
  return { created, error, loading };
};

const mapDispatchToProps = dispatch => ({
  create: values => dispatch(create(values)),
  reset: () => dispatch(reset())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
