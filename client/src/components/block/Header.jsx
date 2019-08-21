import React from 'react';
import { Link }from 'react-router-dom';
import './Header.scss'
import { connect } from 'react-redux';
import { authentication } from '../../services/authentication';
import Typography from '@material-ui/core/Typography';
import CustomSearchBar from "../../utils/CustomSearchBar";
import CustomMaterialButton from "../../utils/CustomMaterialButton";

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        };
    }

    handleLogout = () => {
        authentication.logout();
        this.props.updateCurrentUser();
    }

    render() {
        return (
            <>
                <div className="container-fluid">
                    <div className="row py-3">
                        <div className="col d-flex align-items-center flex-grow-high">
                            {this.props.currentUser ? (
                                <Link to="/">
                                    <Typography variant="h6" noWrap>
                                        Bonjour {this.props.currentUser.firstName}
                                    </Typography>
                                </Link>
                            ) : (
                                <Link to="/">
                                    <Typography variant="h6" noWrap>
                                        Nom du projet
                                    </Typography>
                                </Link>
                            )}
                        </div>
                        <div className="px-3">
                            <CustomSearchBar/>
                        </div>
                        <div className="col d-flex justify-content-center">
                            <ul className="my-auto d-flex justify-content-around">
                                <li className="mr-5">
                                    <Link to="/listing">Listing</Link>
                                </li>
                                <li className="mr-5">
                                    <Link to="/info">Qui est nom du projet</Link>
                                </li>
                                <li>
                                    <Link to="/help">Soutenir nom du projet</Link>
                                </li>
                            </ul>
                        </div>
                        {this.props.currentUser ? (
                            <div className="col d-flex">
                                <div className="d-flex ml-auto">
                                    <div onClick={this.handleLogout}>
                                        <CustomMaterialButton text={'Se déconnecter'} color={'secondary'} />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="col d-flex">
                                    <div className="d-flex ml-auto">
                                        <Link to="/se-connecter">
                                            <CustomMaterialButton text={'Se connecter'} color={'primary'}/>
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
