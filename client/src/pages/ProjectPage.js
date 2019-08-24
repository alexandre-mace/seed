import React from 'react';
import Layout from "../components/block/Layout";
import {Show} from "../components/project";

export default class ProjectPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    };
  }

  render() {
    return (
      <>
        <Layout>
          <Show {...this.props} />
        </Layout>
      </>
    )
  }
}
