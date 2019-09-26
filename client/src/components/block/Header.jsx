import React from 'react';
import { Link }from 'react-router-dom';
import { connect } from 'react-redux';
import { authentication } from '../../services/authentication';
import Typography from '@material-ui/core/Typography';
import CustomSearchBar from "../../utils/CustomSearchBar";
import CustomMaterialButton from "../../utils/CustomMaterialButton";

class Header extends React.Component {
    handleLogout = () => {
        authentication.logout();
        this.props.updateCurrentUser();
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row py-3">
                    <div className="col d-flex align-items-center ">
                        {this.props.currentUser ? (
                            <Link to="/">
                                <Typography variant="h6" noWrap>
                                    Bonjour {this.props.currentUser.firstName}
                                </Typography>
                            </Link>
                        ) : (
                            <Link to="/">
                                <Typography variant="h6" noWrap>
                                    Together
                                </Typography>
                            </Link>
                        )}
                    </div>
                    <div className="col">
                        <Link to="/initier-un-projet">
                            <CustomMaterialButton text={'Initier un projet'} color={'primary'}/>
                        </Link>
                    </div>
                    <div className="col flex-grow-high">
                        <Link to="/tableau-de-bord">
                            <CustomMaterialButton text={'Tableau de bord'}/>
                        </Link>
                    </div>
                    <div className="col">
                        <CustomSearchBar/>
                    </div>

                    <ul className="col d-flex">
                        <li className="col pl-0 d-flex align-content-center">
                            <div className="m-auto">
                                <Link to="/les-projets">Les projets</Link>
                            </div>
                        </li>
                        <li className="col pr-0 d-flex align-content-center">
                            <div className="m-auto">
                                <Link to="/help">Soutenir la plateforme</Link>
                            </div>

                        </li>
                    </ul>

                    <div className="col d-flex">
                        {this.props.currentUser ? (
                            <div onClick={this.handleLogout}>
                                <CustomMaterialButton text={'Se déconnecter'} color={'secondary'} />
                            </div>
                        ) : (
                            <Link to="/se-connecter">
                                <CustomMaterialButton text={'Se connecter'} color={'primary'}/>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
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
