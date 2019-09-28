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
import {AppContext} from "../../utils/AppContext";
import projectAlreadyBoostedChecker from "../../services/projectAlreadyBoostedChecker";
import Chip from "@material-ui/core/Chip";
import Forum from "./Forum";
import {Create} from "../joindemand";
import {authentication} from "../../services/authentication";
import CustomMaterialButton from "../../utils/CustomMaterialButton";

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
  static contextType = AppContext;


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
    redirectToLoginIfNotConnected(this.props);
    if (!projectAlreadyBoostedChecker(item['@id'], this.context.currentUser.supportedProjects)) {
      let supportedProjects = this.context.currentUser.supportedProjects;
      supportedProjects.push(item['@id']);
      this.props.update(item, {likes: item['likes'] + 1})
        .then(() => {
          this.props.updateUser(this.context.currentUser, {supportedProjects: supportedProjects})
          localStorage.setItem('currentUser', JSON.stringify(this.context.currentUser));
          this.context.updateCurrentUser();
          this.props.retrieve(decodeURIComponent(this.props.match.params.id));
        })
    } else {
      this.props.update(item, {likes: item['likes'] - 1})
        .then(() => {
          this.props.updateUser(this.context.currentUser, {supportedProjects: arrayRemove(this.context.currentUser.supportedProjects, item['@id'])})
            .then(() => {
              const newUser = this.context.currentUser;
              newUser.supportedProjects = arrayRemove(newUser.supportedProjects, item['@id'])
              localStorage.setItem('currentUser', JSON.stringify(newUser));
              this.context.updateCurrentUser();
              this.props.retrieve(decodeURIComponent(this.props.match.params.id));
            })
        })
    }
  };

  loggedUserHasAlreadyLikeTheProjectChecker = (item) => {
    let check = false;
    if (!this.context.currentUser) {
      return check;
    }
    this.context.currentUser.joinDemands.forEach(joindemand => {
      if (joindemand.relatedProject['@id'] === item['@id']) {
        check = true
      }
    });
    return check;
  }

  render() {
    if (this.props.deleted) return <Redirect to=".." />;

    const item = this.props.retrieved;

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
                      <CustomBoostButton item={item} user={this.context.currentUser} handleBoost={() => this.handleBoost(item)}/>
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
                    <div>
                      {(item.initiator.email !== this.context.currentUser.email) &&
                      <>
                        {this.loggedUserHasAlreadyLikeTheProjectChecker(item) ? (
                          <p>Vous avez demandé à rejoindre ce projet !</p>
                        ) : (
                          <>
                            {authentication.currentUserValue ? (
                              <Create demander={authentication.currentUserValue['@id']} project={item['@id']} status={'pending'}/>
                            ) : (
                              <Link to="/se-connecter">
                                <CustomMaterialButton text={'Rejoindre le projet'} color={'primary'}/>
                              </Link>
                            )}
                          </>
                        )}
                      </>
                      }
                    </div>
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
  deleted: state.project.del.deleted
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
