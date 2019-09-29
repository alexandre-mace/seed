import React from 'react';
import Header from "./Header.jsx";
import {authentication} from '../../services/authentication';
import Footer from "../block/Footer.jsx";
import {connect} from 'react-redux';
import {AppContext} from '../../utils/AppContext';
import {createMuiTheme} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import {ThemeProvider} from '@material-ui/styles';
import {fetch} from "../../utils/dataAccess";

const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
});

class Layout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: authentication.currentUserValue
        };
    }
    fetchUser = () => {
        fetch(authentication.currentUserValue['@id'])
            .then(response =>
                response
                    .json()
                    .then(retrieved => {
                        if (JSON.stringify(this.state.currentUser) !== JSON.stringify(retrieved) ) {
                            localStorage.setItem('currentUser', JSON.stringify(retrieved))
                            this.setState({
                                currentUser: retrieved
                            })
                        }
                    })
            )
            .catch(e => {
                console.log(e)
            });
    }

    componentDidMount() {
        if (authentication.currentUserValue && authentication.currentUserValue['@id']) {
            this.fetchUser();
        }
    }

    updateCurrentUser = () => {
        this.fetchUser()
    }

    render() {
        return(
            <AppContext.Provider value={{ updateCurrentUser: () => this.updateCurrentUser(), currentUser: this.state.currentUser }}>
                <ThemeProvider theme={theme}>
                    <Header updateCurrentUser={() => this.updateCurrentUser()} currentUser={this.state.currentUser} {...this.props} />
                    <div className="my-4"></div>
                    {this.props.children}
                    <Footer {...this.props}/>
                </ThemeProvider>
            </AppContext.Provider>
        );
    }
}
const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(authentication.logout()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);
