import React from 'react';
import Layout from "../components/block/Layout";
import Login from "../components/user/Login";
import Register from "../components/user/Register";

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        };
    }

    render() {
        return (
            <>
                <Layout {...this.props}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <Login {...this.props}/>
                        </div>
                        <div className="col-12 col-md-6">
                            <Register {...this.props}/>
                        </div>
                    </div>
                </div>
            </Layout>
            </>
        )
    }
}
