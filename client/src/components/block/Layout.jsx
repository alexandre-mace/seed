import React from 'react';
import Header from "./Header.jsx";
import Footer from "../block/Footer.jsx";
import {AppContext} from '../../utils/AppContext';
import {createMuiTheme} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import {ThemeProvider} from '@material-ui/styles';
import {setAuthenticated} from "../../actions/authentication";
import {connect} from "react-redux";
import {authentication} from "../../services/authentication";
import { retrieve, reset } from '../../actions/user/show';

const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
});

class Layout extends React.Component {
    render() {
        if (authentication.currentUserValue && (!this.props.authenticated || !this.props.retrieve)) {
            this.props.retrieve(authentication.currentUserValue['@id'])
                .then(() => {
                    this.props.setAuthenticated(true);
                })
        }
        if (!localStorage.getItem('bienvenue')) {
            localStorage.setItem('bienvenue', 'true')
            this.props.history.push('/bienvenue')
        }
        return(
            <AppContext.Provider value={{}}>
                <ThemeProvider theme={theme}>
                    <Header {...this.props} />
                    <div className="my-4"></div>
                    {this.props.children}
                    <Footer {...this.props}/>
                </ThemeProvider>
            </AppContext.Provider>
        );
    }
}
const mapStateToProps = state => ({
    authenticated: state.authentication.authenticated,
    updated: state.user.update.updated,
    retrieved: state.user.show.retrieved,
});

const mapDispatchToProps = dispatch => ({
    retrieve: id => dispatch(retrieve(id)),
    setAuthenticated: boolean => dispatch(setAuthenticated(boolean)),
    reset: eventSource => dispatch(reset(eventSource)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);
