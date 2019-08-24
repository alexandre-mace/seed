import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { list, reset } from '../../actions/project/list';
import { update } from '../../actions/project/update';
import { update as updateUser } from '../../actions/user/update';
import ListItem from "../block/ListItem";
import {AppContext} from "../../utils/AppContext";
import array_search_recursive from "../../utils/array_search_recursive";
import arrayRemove from "../../utils/arrayRemove";
import redirectToLoginIfNotConnected from "../../utils/redirectToLoginIfNotConnected";

class HighlightedProjects extends Component {
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
    redirectToLoginIfNotConnected(this.props);
    if (!array_search_recursive(item.id, this.context.currentUser.supportedProjects)) {
      let supportedProjects = this.context.currentUser.supportedProjects;
      supportedProjects.push(item);
      updateUser(this.context.currentUser, {supportedProjects: supportedProjects})
      this.props.update(item, {likes: item['likes'] + 1})
        .then(() => {
          localStorage.setItem('currentUser', JSON.stringify(this.context.currentUser));
          this.context.updateCurrentUser();
          this.props.list(
            this.props.match.params.page &&
            decodeURIComponent(this.props.match.params.page)
          );
        });
    } else {
      updateUser(this.context.currentUser, {supportedProjects: arrayRemove(this.context.currentUser.supportedProjects, item['id'])})
      this.props.update(item, {likes: item['likes'] - 1})
        .then(() => {
          const newUser = this.context.currentUser;
          newUser.supportedProjects = arrayRemove(newUser.supportedProjects, item['id']);;
          localStorage.setItem('currentUser', JSON.stringify(newUser));
          this.context.updateCurrentUser();
          this.props.list(
            this.props.match.params.page &&
            decodeURIComponent(this.props.match.params.page)
          );
        });
    }
  };

    render() {
      return (
            <div className="container">
                <div className="row">
                {this.props.retrieved &&
                this.props.retrieved['hydra:member'].map(item => (
                    <ListItem key={item.id} item={item} handleBoost={() => this.handleBoost(item)}/>
                ))}

                </div>
            </div>
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
    return { retrieved, loading, error, eventSource, deletedItem };
};

const mapDispatchToProps = dispatch => ({
    list: page => dispatch(list(page)),
    reset: eventSource => dispatch(reset(eventSource)),
    update: (item, values) => dispatch(update(item, values)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HighlightedProjects);
