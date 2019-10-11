import React from 'react';
import Layout from "../components/block/Layout";
import {Typography} from "@material-ui/core";
import MyDemands from "../components/dashboard/MyDemands";

export default class MyDemandsPage extends React.Component {
  render() {
    return (
      <>
        <Layout {...this.props}>
          <div className="container">
            <div className="row">
              <div className="col">
                <Typography variant="h4" gutterBottom>
                  Mes demandes
                </Typography>
              </div>
            </div>
          </div>
          <MyDemands {...this.props}/>
        </Layout>
      </>
    )
  }
}
