import React from 'react';
import Layout from "../components/block/Layout";
import CreateOrJoin from "../components/project/CreateOrJoin";
import HighlightedProjects from "../components/project/HighlightedProjects";
import {Typography} from "@material-ui/core";

export default class HomePage extends React.Component {
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
                            <div className="col">
                                <Typography variant="h4" component="h4" gutterBottom>
                                    Les plus populaires
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <HighlightedProjects {...this.props} />
                    <div className="d-none d-md-block">
                        <CreateOrJoin/>
                    </div>
                </Layout>
            </>
        )
    }
}
