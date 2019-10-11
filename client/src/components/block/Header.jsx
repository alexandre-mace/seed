import React from 'react';
import { Link }from 'react-router-dom';
import { connect } from 'react-redux';
import { authentication } from '../../services/authentication';
import Typography from '@material-ui/core/Typography';
import CustomSearchBar from "../../utils/CustomSearchBar";
import CustomMaterialButton from "../../utils/CustomMaterialButton";
import {setAuthenticated} from "../../actions/authentication";
import CustomBottomNavigation from "./CustomBottomNavigation";
import MobileMenu from "./MobileMenu";
import {CustomLoader} from "./CustomLoader";

class Header extends React.Component {
    handleLogout = () => {
        authentication.logout();
        this.props.setAuthenticated(false);
    }

    render() {
        const user = this.props.authenticated ? (this.props.updated ? this.props.updated : this.props.retrieved) : false;

        return (
            <>
                <div className="container-fluid d-none d-md-block">
                    <div className="row py-3">
                        <div className="col d-flex align-items-center ">
                            {authentication.currentUserValue ? (
                                <>
                                    {user &&
                                    <Link to="/">
                                        <Typography variant="h6" noWrap>
                                            Bonjour {user.firstName}
                                        </Typography>
                                    </Link>
                                    }
                                    {!user &&
                                    <CustomLoader size={20}/>
                                    }
                                </>
                            ) : (
                                <Link to="/">
                                    <Typography variant="h6" noWrap>
                                        Together
                                    </Typography>
                                </Link>
                            )}
                        </div>
                        <div className={'col' + (user ? '' : ' flex-grow-high')}>
                            <Link to="/initier-un-projet">
                                <CustomMaterialButton text={'Initier un projet'} color={'primary'}/>
                            </Link>
                        </div>
                        {user &&
                        <div className="col flex-grow-high">
                            <Link to="/tableau-de-bord">
                                <CustomMaterialButton text={'Tableau de bord'}/>
                            </Link>
                        </div>
                        }
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
                            {user ? (
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
                <div className="container-fluid py-3 d-block d-md-none">
                    <div className="row">
                        <div className="col d-flex align-items-center ">
                            {authentication.currentUserValue ? (
                                <>
                                    {user &&
                                    <Link to="/">
                                        <Typography variant="h6" noWrap>
                                            Bonjour {user.firstName}
                                        </Typography>
                                    </Link>
                                    }
                                    {!user &&
                                    <CustomLoader size={20}/>
                                    }
                                </>
                            ) : (
                                <Link to="/">
                                    <Typography variant="h6" noWrap>
                                        Together
                                    </Typography>
                                </Link>
                            )}
                        </div>
                        <MobileMenu user={user} handleLogout={() => this.handleLogout()}/>
                    </div>
                    <div className="row">
                        <div className="col">
                            <CustomSearchBar/>
                        </div>
                    </div>
                    <CustomBottomNavigation user={user} {...this.props}/>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    authenticated: state.authentication.authenticated,
    updated: state.user.update.updated,
    retrieved: state.user.show.retrieved
});

const mapDispatchToProps = dispatch => ({
    setAuthenticated: boolean => dispatch(setAuthenticated(boolean))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
