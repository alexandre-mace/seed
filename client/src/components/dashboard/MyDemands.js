import React from 'react';
import {Link} from "react-router-dom";
import {Typography} from "@material-ui/core";
import {connect} from "react-redux";

function MyDemands(props) {

  const user = props.authenticated ? (props.updated ? props.updated : props.retrieved) : false;

  return (
    <>
      {user && user.demands && user.demands.length > 0 ? (
        <>
          {user.demands.map((demand, index) => (
            <div key={index} className="d-flex justify-content-around">
              <div className="col text-center">
                <Link to={`les-projets/${encodeURIComponent(demand.relatedProject['@id'])}`}>
                  <Typography variant="body1" component="h6" gutterBottom>
                    {demand.relatedProject.pitch}
                  </Typography>
                </Link>
              </div>
              <div className="col d-flex text-center">
                <p className="m-auto">{demand.status}</p>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="col">
          <p>Vous n'avez fait aucune demande.</p>
        </div>
      )}
    </>
  );
}

const mapStateToProps = state => ({
  retrieved: state.user.show.retrieved,
  authenticated: state.authentication.authenticated,
  updated: state.user.update.updated,
});

export default connect(
  mapStateToProps
)(MyDemands);

