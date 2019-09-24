import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { list, reset } from '../../actions/project/list';
import CustomMaterialButton from "../../utils/CustomMaterialButton";

class CreateOrJoin extends Component {

    componentWillUnmount() {
        this.props.reset(this.props.eventSource);
    }

    render() {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col text-center">
                        <Link to="/initier-un-projet">
                          <CustomMaterialButton size={'large'} text={'Initier un projet'} color={'primary'}/>
                        </Link>
                    </div>
                    <div className="col text-center">
                        <Link to="/les-projets">
                          <CustomMaterialButton size={'large'} text={'Voir les projets'} color={'primary'}/>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        loading,
        eventSource,
    } = state.project.list;
    return { loading,eventSource };
};

const mapDispatchToProps = dispatch => ({
    list: page => dispatch(list(page)),
    reset: eventSource => dispatch(reset(eventSource))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateOrJoin);
