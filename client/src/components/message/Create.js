import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from './Form';
import { create, reset } from '../../actions/message/create';
import { reset as updateReset } from '../../actions/message/update';
import {retrieve} from "../../actions/project/show";

class Create extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    created: PropTypes.object,
    create: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };

  componentWillUnmount() {
    this.props.reset();
  }

  handleSubmit = (values) => {
    values['topic'] = this.props.topic['@id']
    this.props.create(values);
  }

  render() {
    if (this.props.created) {
      this.props.updateReset(this.props.eventSource);
      this.props.retrieve(this.props.project['@id']);
      return (
        <Redirect
          to={`/les-projets/${encodeURIComponent(this.props.project['@id'])}`}
        />
      );    }
    return (
      <div>
        {/*<h1>New Message</h1>*/}

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

        <Form onSubmit={this.handleSubmit} values={this.props.item} topic={this.props.topic}/>
        {/*<Link to="." className="btn btn-primary">*/}
        {/*  Back to list*/}
        {/*</Link>*/}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const eventSource =  state.user.update.eventSource;
  const { created, error, loading } = state.message.create;
  return { created, error, loading, eventSource };
};

const mapDispatchToProps = dispatch => ({
  retrieve: id => dispatch(retrieve(id)),
  create: values => dispatch(create(values)),
  reset: eventSource => dispatch(reset(eventSource)),
  updateReset: eventSource => dispatch(updateReset(eventSource))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
