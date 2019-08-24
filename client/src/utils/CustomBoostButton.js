import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import array_search_recursive from "./array_search_recursive";
import {Badge} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles(theme => ({
  button: {
    margin: 'auto'
  },
}));

export default function CustomBoostButton(props) {
  const classes = useStyles();
  return (
      <IconButton style={{ fontSize: 30 }} className={classes.button} color={props.user && array_search_recursive(props.item.id, props.user.supportedProjects) ? 'secondary' : 'default'} aria-label="add to favorites" onClick={() => props.handleBoost(props.item)}>
          <FavoriteIcon style={{ fontSize: 40 }} />
      </IconButton>
  );
}
