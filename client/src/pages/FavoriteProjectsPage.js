import React from 'react';
import Layout from "../components/block/Layout";
import {Typography} from "@material-ui/core";
import FavoriteProjects from "../components/project/FavoriteProjects";

export default class FavoriteProjectsPage extends React.Component {
  render() {
    return (
      <>
        <Layout {...this.props}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <Typography variant="h4" gutterBottom>
                  Mes projets favoris
                </Typography>
              </div>
              <FavoriteProjects {...this.props}/>
            </div>
          </div>
        </Layout>
      </>
    )
  }
}
