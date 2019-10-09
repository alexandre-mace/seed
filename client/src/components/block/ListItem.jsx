import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Link from "react-router-dom/es/Link";
import {Badge} from "@material-ui/core";
import projectAlreadyBoostedChecker from "../../services/projectAlreadyBoostedChecker";
import Chip from '@material-ui/core/Chip';
import {setAuthenticated} from "../../actions/authentication";
import {connect} from "react-redux";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    display: 'flex',
    height: '100%',
    flexDirection: 'column'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  title: {
      fontSize: '1.2rem'
  },
  root: {
      paddingTop: '0'
  }
}));

function ListItem(props) {
    const classes = useStyles();

    const user = props.authenticated ? (props.updated ? props.updated : props.retrieved) : false;
    console.log(props.item);
    return (
        <div className="col-md-4 my-3">
            <Card key={props.item['@id']} className={classes.card}>
                <Link to={`les-projets/${encodeURIComponent(props.item['@id'])}`}>
                    <CardHeader
                        classes={{title: classes.title}}
                        title={`${props.item.pitch.substring(0, 60)} ${props.item.pitch.length > 58 ? '...' : ''}`}
                        subheader={props.item.initiator.firstName}
                    />
                    <CardContent classes={{root: classes.root}}>
                        <div className="d-flex flex-wrap">
                            {props.item.categories.map((category, index) => (
                                <div className="mr-2 mb-2" key={index}>
                                    <Chip
                                        classes={{}}
                                        label={category}
                                        className={classes.chip}
                                        color="primary"
                                    />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Link>

                <CardActions className={'mt-auto'} disableSpacing>
                    <IconButton color={user && projectAlreadyBoostedChecker(props.item['@id'], user.supportedProjects) ? 'secondary' : 'default'} aria-label="add to favorites" onClick={() => props.handleBoost(props.item)}>
                        <Badge badgeContent={props.item['likes']}>
                            <FavoriteIcon />
                        </Badge>
                    </IconButton>
                    {/*<IconButton aria-label="share">*/}
                    {/*    <ShareIcon />*/}
                    {/*</IconButton>*/}
                </CardActions>
            </Card>
        </div>
    );
}

const mapStateToProps = state => ({
    authenticated: state.authentication.authenticated,
    updated: state.user.update.updated,
    retrieved: state.user.show.retrieved
});

const mapDispatchToProps = dispatch => ({
    setAuthenticated: boolean => dispatch(setAuthenticated(boolean))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListItem);
