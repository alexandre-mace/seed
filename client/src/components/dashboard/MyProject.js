import React from 'react';
import Typography from '@material-ui/core/Typography';
import MyProjectMembers from "./MyProjectMembers";
import MyProjectDemands from "./MyProjectDemands";

export default function MyProject(props) {
  return (
    <div className="d-flex flex-column flex-md-row justify-content-around">
      <div className="d-flex flex-column">
        <Typography variant="subtitle2">
          Les demandes
        </Typography>
        <MyProjectDemands {...props} project={props.project}/>
      </div>
      <div className="d-flex flex-column">
        <Typography variant="subtitle2">
          Les membres
        </Typography>
        <MyProjectMembers {...props} project={props.project} />
      </div>
    </div>
  );
}
