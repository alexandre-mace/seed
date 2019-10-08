import React from 'react';
import Layout from "../components/block/Layout";
import {Typography} from "@material-ui/core";
import CustomMaterialButton from "../utils/CustomMaterialButton";

export default class HelpPage extends React.Component {
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
                          <Typography variant="h2" component="h2" gutterBottom>
                              Soutenir la plateforme
                          </Typography>
                      </div>
                      <div className="col">
                          <Typography variant="body1" gutterBottom>
                              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis dolore doloribus exercitationem illo qui repellendus repudiandae similique suscipit ut voluptate. Dignissimos ea nemo possimus praesentium quibusdam quo sed vel voluptatum.
                          </Typography>
                          <CustomMaterialButton color={'primary'} text={'Faire un don'}/>
                      </div>
                  </div>
              </div>
          </Layout>
      </>
    )
  }
}
