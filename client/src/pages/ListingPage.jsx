import React from 'react';
import Layout from "../components/block/Layout";
import {List} from "../components/project";

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
                    <List {...this.props}/>
                </div>
            </div>
        </Layout>
      </>
    )
  }
}
