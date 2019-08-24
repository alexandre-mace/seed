import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { retrieve, reset } from '../../actions/project/show';
import { del } from '../../actions/project/delete';
import { update } from '../../actions/project/update';
import CustomMaterialButton from "../../utils/CustomMaterialButton";
import {Typography} from "@material-ui/core";
import CustomBoostButton from "../../utils/CustomBoostButton";
import redirectToLoginIfNotConnected from "../../utils/redirectToLoginIfNotConnected";
import array_search_recursive from "../../utils/array_search_recursive";
import {update as updateUser} from "../../actions/user/update";
import arrayRemove from "../../utils/arrayRemove";
import {AppContext} from "../../utils/AppContext";

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
    if (!array_search_recursive(item.id, this.context.currentUser.supportedProjects)) {
      let supportedProjects = this.context.currentUser.supportedProjects;
      supportedProjects.push(item);
      updateUser(this.context.currentUser, {supportedProjects: supportedProjects})
      this.props.update(item, {likes: item['likes'] + 1})
        .then(() => {
          localStorage.setItem('currentUser', JSON.stringify(this.context.currentUser));
          this.context.updateCurrentUser();
          this.props.retrieve(decodeURIComponent(this.props.match.params.id));
        });
    } else {
      updateUser(this.context.currentUser, {supportedProjects: arrayRemove(this.context.currentUser.supportedProjects, item['id'])})
      this.props.update(item, {likes: item['likes'] - 1})
        .then(() => {
          const newUser = this.context.currentUser;
          newUser.supportedProjects = arrayRemove(newUser.supportedProjects, item['id']);;
          localStorage.setItem('currentUser', JSON.stringify(newUser));
          this.context.updateCurrentUser();
          this.props.retrieve(decodeURIComponent(this.props.match.params.id));
        });
    }
  };
  render() {
    if (this.props.deleted) return <Redirect to=".." />;

    const item = this.props.retrieved;
    console.log(this.context.currentUser)

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
              <Link to="/les-projets">
                <CustomMaterialButton color={'primary'} text={'Retour aux projets'}/>
              </Link>
              {item && (
                <>
                  <Typography variant="h1" component="h1" gutterBottom>
                    {item.pitch}
                  </Typography>
                  <div className="d-flex justify-content-between align-content-center">
                    <Typography variant={'h5'} gutterBottom>
                      {item.initiator.firstName}
                    </Typography>
                    <div className="d-flex">
                      <CustomBoostButton item={item} user={this.context.currentUser} handleBoost={() => this.handleBoost(item)}/>
                    </div>
                  </div>
                  <Typography variant={'h6'} gutterBottom>
                    {item.likes} personnes soutiennent ce projet
                  </Typography>
                  <div className="mb-5"></div>
                  <Typography variant={'body1'}>
                    <span dangerouslySetInnerHTML={{__html: item.description}}></span>
                  </Typography>
                  {/*    <th scope="row">likes</th>*/}
                  {/*    <td>{item['likes']}</td>*/}
                  {/*  </tr>*/}
                  {/*  <tr>*/}
                  {/*    <th scope="row">discussions</th>*/}
                  {/*    <td>{this.renderLinks('discussions', item['discussions'])}</td>*/}
                  {/*  </tr>*/}
                  {/*  <tr>*/}
                  {/*    <th scope="row">initiator</th>*/}
                  {/*    <td>{item['initiator']}</td>*/}
                  {/*  </tr>*/}
                  {/*  <tr>*/}
                  {/*    <th scope="row">supporters</th>*/}
                  {/*    <td>{item['supporters']}</td>*/}
                  {/*  </tr>*/}
                  {/*  </tbody>*/}
                  {/*</table>*/}
                </>
              )}

              {/*  {item && (*/}
              {/*      <Link to={`/projects/edit/${encodeURIComponent(item['@id'])}`}>*/}
              {/*        <button className="btn btn-warning">Edit</button>*/}
              {/*      </Link>*/}
              {/*  )}*/}
              {/*<button onClick={this.del} className="btn btn-danger">*/}
              {/*  Delete*/}
              {/*</button>*/}
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
  update: (item, values) => dispatch(update(item, values))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Show);
