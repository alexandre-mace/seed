import React, {useContext} from 'react';
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
import {AppContext} from "../../utils/AppContext";
import projectAlreadyBoostedChecker from "../../services/projectAlreadyBoostedChecker";
import Chip from '@material-ui/core/Chip';

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

export default function ListItem(props) {
    const classes = useStyles();

    const context = useContext(AppContext);

    return (
        <div className="col-4 my-3">
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
                    <IconButton color={context.currentUser && projectAlreadyBoostedChecker(props.item['@id'], context.currentUser.supportedProjects) ? 'secondary' : 'default'} aria-label="add to favorites" onClick={() => props.handleBoost(props.item)}>
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
