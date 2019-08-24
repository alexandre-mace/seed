import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import InitiateForm from './InitiateForm';
import { create, reset } from '../../actions/project/create';
import Layout from "../../components/block/Layout";

class Initiate extends Component {
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

    render() {
        if (this.props.created)
            return (
                <Redirect
                    to={`les-projets/${encodeURIComponent(this.props.created['@id'])}`}
                />
            );

        return (
            <Layout>
                <div className="container">
                    <div className="row">
                        <div className="col">
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

                            <InitiateForm onSubmit={this.props.create} values={this.props.item} />
                        </div>
                    </div>
                </div>

            </Layout>
        );
    }
}

const mapStateToProps = state => {
    const { created, error, loading } = state.project.create;
    return { created, error, loading };
};

const mapDispatchToProps = dispatch => ({
    create: values => dispatch(create(values)),
    reset: () => dispatch(reset())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Initiate);
