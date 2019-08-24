import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Link from "react-router-dom/es/Link";
import {Badge} from "@material-ui/core";
import {AppContext} from "../../utils/AppContext";
import array_search_recursive from "../../utils/array_search_recursive";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
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
}));

export default function ListItem(props) {
  const classes = useStyles();

    const context = useContext(AppContext);

    return (
        <div className="col-4 my-3">
            <Card key={props.item['@id']} className={classes.card}>
                <Link to={`les-projets/${encodeURIComponent(props.item['@id'])}`}>
                    <CardHeader
                        title={props.item.pitch}
                        subheader={props.item.initiator.firstName}
                    />
                    <CardContent>
                        <Typography variant="body1" color="textPrimary" component="p">
                            {props.item['pitch']}
                        </Typography>
                        <Typography dangerouslySetInnerHTML={{__html: props.item.description}} variant="body1" color="textPrimary" component="p">
                        </Typography>
                    </CardContent>
                </Link>

                <CardActions disableSpacing>
                    <IconButton color={context.currentUser && array_search_recursive(props.item.id, context.currentUser.supportedProjects) ? 'secondary' : 'default'} aria-label="add to favorites" onClick={() => props.handleBoost(props.item)}>
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
