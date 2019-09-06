import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from "@material-ui/icons/Favorite";
import projectAlreadyBoostedChecker from "../services/projectAlreadyBoostedChecker";

const useStyles = makeStyles(theme => ({
  button: {
    margin: 'auto'
  },
}));

export default function CustomBoostButton(props) {
  const classes = useStyles();
  return (
      <IconButton style={{ fontSize: 30 }} className={classes.button}
            color={props.user && projectAlreadyBoostedChecker(props.item['@id'], props.user.supportedProjects) ? 'secondary' : 'default'}
            aria-label="add to favorites" onClick={() => props.handleBoost(props.item)}>
          <FavoriteIcon style={{ fontSize: 40 }} />
      </IconButton>
  );
}
