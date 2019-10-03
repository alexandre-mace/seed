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
            <Layout>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Login {...this.props}/>
                        </div>
                        <div className="mx-5"></div>
                        <div className="col">
                            <Register {...this.props}/>
                        </div>
                    </div>
                </div>
            </Layout>
            </>
        )
    }
}
