import React from 'react';
import Layout from "../components/block/Layout";
import {List} from "../components/project";
import {Typography} from "@material-ui/core";

export default class ListingPage extends React.Component {
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
                    <div className="col-12">
                        <Typography variant="h2" component="h2" gutterBottom>
                            Les projets
                        </Typography>
                    </div>
                    <List {...this.props}/>
                </div>
            </div>
        </Layout>
      </>
    )
  }
}
