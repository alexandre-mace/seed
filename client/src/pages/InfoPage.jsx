import React from 'react';
import Layout from "../components/block/Layout";
import {Typography} from "@material-ui/core";

export default class InfoPage extends React.Component {
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
                  <div className="col-12">
                      <Typography variant="h4" gutterBottom>
                          Qui est Together ?
                      </Typography>
                  </div>
                  <div className="col">
                      <Typography variant="body1" gutterBottom>
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis dolore doloribus exercitationem illo qui repellendus repudiandae similique suscipit ut voluptate. Dignissimos ea nemo possimus praesentium quibusdam quo sed vel voluptatum.
                      </Typography>
                  </div>
              </div>
          </div>
        </Layout>
      </>
    )
  }
}
