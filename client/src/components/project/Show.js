import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { retrieve, reset } from '../../actions/project/show';
import { del } from '../../actions/project/delete';
import { update } from '../../actions/project/update';
import {Typography} from "@material-ui/core";
import CustomBoostButton from "../../utils/CustomBoostButton";
import redirectToLoginIfNotConnected from "../../utils/redirectToLoginIfNotConnected";
import {update as updateUser} from "../../actions/user/update";
import arrayRemove from "../../utils/arrayRemove";
import projectAlreadyBoostedChecker from "../../services/projectAlreadyBoostedChecker";
import Chip from "@material-ui/core/Chip";
import Forum from "./Forum";
import {Create} from "../joindemand";
import CustomMaterialButton from "../../utils/CustomMaterialButton";
import jsonLDFlattener from "../../utils/jsonLDFlattener";

class Show extends Component {
  static propTypes = {
    retrieved: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    eventSource: PropTypes.instanceOf(EventSource),
    retrieve: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    deleteError: PropTypes.string,
    deleteLoading: PropTypes.bool.isRequired,
    deleted: PropTypes.object,
    del: PropTypes.func.isRequired,
  };


  componentDidMount() {
    this.props.retrieve(decodeURIComponent(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.reset(this.props.eventSource);
  }

  del = () => {
    if (window.confirm('Are you sure you want to delete this item?'))
      this.props.del(this.props.retrieved);
  };

  handleBoost = (item) => {
    const user = this.props.authenticated ? (this.props.userUpdated ? this.props.userUpdated : this.props.userRetrieved) : false;

    if (!user) {
      redirectToLoginIfNotConnected(this.props);
    } else {
      if (!projectAlreadyBoostedChecker(item['@id'], user.supportedProjects)) {
        let supportedProjects = jsonLDFlattener(user.supportedProjects);
        supportedProjects.push(item['@id']);
        this.props.update(item, {likes: item['likes'] + 1})
          .then(() => {
            this.props.updateUser(user, {supportedProjects: supportedProjects})
          })
      } else {
        this.props.update(item, {likes: item['likes'] - 1})
          .then(() => {
            this.props.updateUser(user, {supportedProjects: arrayRemove(jsonLDFlattener(user.supportedProjects), item['@id'])})
          })
      }
    }
  };

  loggedUserHasAlreadyLikeTheProjectChecker = (item) => {
    const user = this.props.authenticated ? (this.props.userUpdated ? this.props.userUpdated : this.props.userRetrieved) : false;

    let check = false;
    if (!user) {
      return check;
    }
    user.joinDemands.forEach(joindemand => {
      if (joindemand.relatedProject['@id'] === item['@id']) {
        check = true
      }
    });
    return check;
  }

  render() {
    if (this.props.deleted) return <Redirect to=".." />;

    const item = this.props.updated ? this.props.updated : this.props.retrieved;
    const user = this.props.authenticated ? (this.props.userUpdated ? this.props.userUpdated : this.props.userRetrieved) : false;

    if (this.props.authenticated) {
      console.log(user['@id'])
    }
    return (
        <div className="container">
          <div className="row">
            <div className="col">
              {/*{this.props.loading && (*/}
              {/*  /!*<div className="alert alert-info" role="status">*!/*/}
              {/*  /!*  Loading...*!/*/}
              {/*  /!*</div>*!/*/}
              {/*)}*/}
              {this.props.error && (
                <div className="alert alert-danger" role="alert">
                  <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
                  {this.props.error}
                </div>
              )}
              {this.props.deleteError && (
                <div className="alert alert-danger" role="alert">
                  <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
                  {this.props.deleteError}
                </div>
              )}
              {/*<div className="back-to">*/}
              {/*  <Link to="/les-projets">*/}
              {/*    <Typography variant="h6" component="h6" gutterBottom>*/}
              {/*      Retour aux projets*/}
              {/*    </Typography>*/}
              {/*  </Link>*/}
              {/*</div>*/}
              {item && (
                <>
                  <div className="d-flex justify-content-between">
                    <Typography variant="h2" component="h2" gutterBottom>
                      {item.pitch}
                    </Typography>
                    <div className="d-flex align-items-center">
                      <CustomBoostButton item={item} user={user} handleBoost={() => this.handleBoost(item)}/>
                      <Typography variant={'h6'}>
                        {item.likes}
                      </Typography>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-column justify-content-between">
                      <Typography variant={'h5'} gutterBottom>
                        {item.initiator.firstName}
                      </Typography>
                      <div className="d-flex flex-wrap">
                        {item.categories.map((category, index) => (
                          <div className="mr-2 mb-2" key={index}>
                            <Chip
                              label={category}
                              color="primary"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    {this.props.authenticated ? (
                      <>
                        {this.loggedUserHasAlreadyLikeTheProjectChecker(item) ? (
                          <p>Vous avez demandé à rejoindre ce projet !</p>
                        ) : (
                          <Create demander={user['@id']} project={item['@id']} status={'pending'}/>
                        )}
                      </>
                    ) : (
                      <Link to="/se-connecter">
                        <CustomMaterialButton text={'Rejoindre le projet'} color={'primary'}/>
                      </Link>
                    )}
                  </div>
                  <div className="mb-5"></div>
                  <Typography variant={'body1'}>
                    <span dangerouslySetInnerHTML={{__html: item.description}}></span>
                  </Typography>
                  <div className="mb-5"></div>
                  <Forum project={item}/>
                </>
              )}

            </div>
          </div>
        </div>
    );
  }

  renderLinks = (type, items) => {
    if (Array.isArray(items)) {
      return items.map((item, i) => (
        <div key={i}>{this.renderLinks(type, item)}</div>
      ));
    }

    return (
      <Link to={`../${type}/show/${encodeURIComponent(items)}`}>{items}</Link>
    );
  };
}
Show.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  retrieved: state.project.show.retrieved,
  error: state.project.show.error,
  loading: state.project.show.loading,
  eventSource: state.project.show.eventSource,
  deleteError: state.project.del.error,
  deleteLoading: state.project.del.loading,
  deleted: state.project.del.deleted,
  updated: state.project.update.updated,
  authenticated: state.authentication.authenticated,
  userUpdated: state.user.update.updated,
  userRetrieved: state.user.show.retrieved
});

const mapDispatchToProps = dispatch => ({
  retrieve: id => dispatch(retrieve(id)),
  del: item => dispatch(del(item)),
  reset: eventSource => dispatch(reset(eventSource)),
  update: (item, values) => dispatch(update(item, values)),
  updateUser: (item, values) => dispatch(updateUser(item, values))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Show);
