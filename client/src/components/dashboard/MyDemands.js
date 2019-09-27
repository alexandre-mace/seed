import React from 'react';
import {Link} from "react-router-dom";
import {Typography} from "@material-ui/core";

export default function MyDemands(props) {
  return (
    <>
      {}
      {props.demands && props.demands.length > 0 ? (
        <>
          {props.demands.map((demand, index) => (
            <div key={index} className="d-flex justify-content-around">
              <Link to={`les-projets/${encodeURIComponent(demand.relatedProject['@id'])}`}>
                <Typography variant="body1" component="h6" gutterBottom>
                  {demand.relatedProject.pitch}
                </Typography>
              </Link>
              <p>{demand.status}</p>
            </div>
          ))}
        </>
      ) : (
        <p>Vous avez fait aucune demande</p>
      )}
    </>
  );
}
