import React from 'react';
import Layout from "../components/block/Layout";
import CreateOrJoin from "../components/project/CreateOrJoin";
import HighlightedProjects from "../components/project/HighlightedProjects";

export default class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        };
    }

    render() {
        return (
            <>
            <Layout>
                <HighlightedProjects {...this.props} />
                <CreateOrJoin/>
            </Layout>
            </>
        )
    }
}
