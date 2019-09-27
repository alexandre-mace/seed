import React from 'react';
import Layout from "../components/block/Layout";
import {Typography} from "@material-ui/core";
import UserAccessor from "../components/dashboard/UserAccessor";

export default class DashboardPage extends React.Component {
  render() {
    return (
      <>
        <Layout>
          <div className="container">
            <div className="row">
              <div className="col">
                <Typography variant="h4" component="h4" gutterBottom>
                  Tableau de bord
                </Typography>
              </div>
            </div>
          </div>
          <UserAccessor {...this.props}/>
        </Layout>
      </>
    )
  }
}
