import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

export default function CustomShow(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <div className="d-flex">
        <div className="d-flex flex-column">
          <Typography variant="h6" component="h3">
            {props.message.author.firstName}
          </Typography>
          {props.message.createdAt &&
          <Typography variant="caption" display="block" gutterBottom>
            {props.message.createdAt.split(' ')[1]}
            <br/>
            {props.message.createdAt.split(' ')[0]}
          </Typography>
          }
        </div>
        <div className="ml-3">
          <Typography component="p">
            {props.message.content}
          </Typography>
        </div>
      </div>
    </Paper>
  )
}
