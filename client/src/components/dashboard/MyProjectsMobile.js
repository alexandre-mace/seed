import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Badge} from "@material-ui/core";
import MyProject from "./MyProject";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function MyProjectsMobile(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      {props.projects.length > 0 && props.projects.map((project, index) => (
        <ExpansionPanel key={index}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              <Badge className={classes.padding} color="secondary" badgeContent={project.joinDemands.filter(demand => (demand.status === 'En attente')).length > 0 ? project.joinDemands.filter(demand => (demand.status === 'En attente')).length : undefined}>
                {project.pitch}
              </Badge>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <MyProject {...props} project={project} reloadMyProjects={() => props.reloadMyProjects()}/>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}

    </div>
  );
}
