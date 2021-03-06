import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { list, reset } from '../../actions/project/list';
import ListItem from "../block/ListItem";
import redirectToLoginIfNotConnected from "../../utils/redirectToLoginIfNotConnected";
import projectAlreadyBoostedChecker from "../../services/projectAlreadyBoostedChecker";
import arrayRemove from "../../utils/arrayRemove";
import {update as updateUser} from "../../actions/user/update";
import {AppContext} from "../../utils/AppContext";
import {update} from "../../actions/project/update";
import jsonLDFlattener from "../../utils/jsonLDFlattener";

class List extends Component {
  static propTypes = {
    retrieved: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    eventSource: PropTypes.instanceOf(EventSource),
    deletedItem: PropTypes.object,
    list: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };
  static contextType = AppContext;
  constructor(props){
    super(props);
    this.state = {
      liking: false
    }
  }

  componentDidMount() {
    this.props.list(
      this.props.match.params.page &&
        decodeURIComponent(this.props.match.params.page)
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.page !== nextProps.match.params.page)
      nextProps.list(
        nextProps.match.params.page &&
          decodeURIComponent(nextProps.match.params.page)
      );
  }

  componentWillUnmount() {
    this.props.reset(this.props.eventSource);
  }

  handleBoost = (item) => {
    const user = this.props.authenticated ? (this.props.userUpdated ? this.props.userUpdated : this.props.userRetrieved) : false;

    if (!user) {
      redirectToLoginIfNotConnected(this.props);
    } else {
      if (!projectAlreadyBoostedChecker(item['@id'], user.supportedProjects)) {
        let supportedProjects = jsonLDFlattener(user.supportedProjects);
        supportedProjects.push(item['@id']);
        this.setState({liking: true});
        this.props.update(item, {likes: item['likes'] + 1})
          .then(() => {
            this.props.updateUser(user, {supportedProjects: supportedProjects})
              .then(() => {
                this.props.list(
                  this.props.match.params.page &&
                  decodeURIComponent(this.props.match.params.page)
                )
                  .then(() => {
                    this.setState({liking: false});
                  });
              })
          })
      } else {
        this.setState({liking: true});
        this.props.update(item, {likes: item['likes'] - 1})
          .then(() => {
            this.props.updateUser(user, {supportedProjects: arrayRemove(jsonLDFlattener(user.supportedProjects), item['@id'])})
              .then(() => {
                this.props.list(
                  this.props.match.params.page &&
                  decodeURIComponent(this.props.match.params.page)
                )
                  .then(() => {
                    this.setState({liking: false});
                  });
              })
          })
      }
    }
  };

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
              {this.props.deletedItem && (
                  <div className="alert alert-success">
                      {this.props.deletedItem['@id']} deleted.
                  </div>
              )}
              {this.props.error && (
                  <div className="alert alert-danger">{this.props.error}</div>
              )}
          </div>
          <div className="row">
            {this.props.retrieved &&
            this.props.retrieved['hydra:member'].map(item => (
              <ListItem key={item.id} item={item} handleBoost={() => this.state.liking ? null : this.handleBoost(item)}/>
            ))}

          </div>
        </div>

        {this.pagination()}
        </>
    );
  }

  pagination() {
    const view = this.props.retrieved && this.props.retrieved['hydra:view'];
    if (!view) return;

    const {
      'hydra:first': first,
      'hydra:previous': previous,
      'hydra:next': next,
      'hydra:last': last
    } = view;

    return (
      <nav aria-label="Page navigation">
        <Link
          to="."
          className={`btn btn-primary${previous ? '' : ' disabled'}`}
        >
          <span aria-hidden="true">&lArr;</span> First
        </Link>
        <Link
          to={
            !previous || previous === first ? '.' : encodeURIComponent(previous)
          }
          className={`btn btn-primary${previous ? '' : ' disabled'}`}
        >
          <span aria-hidden="true">&larr;</span> Previous
        </Link>
        <Link
          to={next ? encodeURIComponent(next) : '#'}
          className={`btn btn-primary${next ? '' : ' disabled'}`}
        >
          Next <span aria-hidden="true">&rarr;</span>
        </Link>
        <Link
          to={last ? encodeURIComponent(last) : '#'}
          className={`btn btn-primary${next ? '' : ' disabled'}`}
        >
          Last <span aria-hidden="true">&rArr;</span>
        </Link>
      </nav>
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

const mapStateToProps = state => {
  const {
    retrieved,
    loading,
    error,
    eventSource,
    deletedItem
  } = state.project.list;
  return { retrieved, loading, error, eventSource, deletedItem,
    authenticated: state.authentication.authenticated,
    userUpdated: state.user.update.updated,
    userRetrieved: state.user.show.retrieved
  };
};

const mapDispatchToProps = dispatch => ({
  list: page => dispatch(list(page)),
  reset: eventSource => dispatch(reset(eventSource)),
  update: (item, values) => dispatch(update(item, values)),
  updateUser: (item, values) => dispatch(updateUser(item, values))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
