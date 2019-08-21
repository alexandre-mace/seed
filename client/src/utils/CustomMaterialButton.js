import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
  },
  input: {
    display: 'none',
  },
}));

export default function CustomMaterialButton(props) {
  const classes = useStyles();

  return (
      <Button type={props.type ? props.type : 'button'} variant="contained" color={props.color} className={classes.button}>
        {props.text}
      </Button>
  );
}
