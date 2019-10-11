import React from 'react';
import Layout from "../components/block/Layout";
import {Typography} from "@material-ui/core";
import MemberProjects from "../components/project/MemberProjects";

export default class MemberProjectsPage extends React.Component {
  render() {
    return (
      <>
        <Layout {...this.props}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <Typography variant="h4" gutterBottom>
                  Mes projets
                </Typography>
              </div>
              <MemberProjects {...this.props}/>
            </div>
          </div>
        </Layout>
      </>
    )
  }
}
