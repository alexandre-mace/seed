import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ListIcon from '@material-ui/icons/List';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DashboardIcon from '@material-ui/icons/Dashboard';

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        bottom: '0',
        left: '0',
        width: '100vw',
        zIndex: '10000'
    },
});

export default function CustomBottomNavigation(props) {
    const classes = useStyles();

    let defaultValue = 0;
    if (['/', '/les-projets', '/tableau-de-bord'].includes(props.history.location.pathname)) {
        defaultValue = props.history.location.pathname;
    }

    const [value, setValue] = React.useState(defaultValue);

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                props.history.push(newValue)
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction value={'/'} label="Populaires" icon={<FavoriteIcon />} />
            <BottomNavigationAction value={'/les-projets'} label="Voir tous" icon={<ListIcon />} />
            <BottomNavigationAction value={'/tableau-de-bord'} label="Tableau de bord" icon={<DashboardIcon />} />
        </BottomNavigation>
    );
}
