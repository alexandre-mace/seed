import React from 'react';
import Layout from "../components/block/Layout";
import ListItem from "../components/block/ListItem";

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
              <div className="col-4 my-3">
                <ListItem/>
              </div>
              <div className="col-4 my-3">
                <ListItem/>
              </div>
              <div className="col-4 my-3">
                <ListItem/>
              </div>
              <div className="col-4 my-3">
                <ListItem/>
              </div>
              <div className="col-4 my-3">
                <ListItem/>
              </div>
              <div className="col-4 my-3">
                <ListItem/>
              </div>
            </div>
          </div>
        </Layout>
      </>
    )
  }
}
