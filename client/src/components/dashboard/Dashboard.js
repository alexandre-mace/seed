import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MyProjects from "./MyProjects";
import MyDemands from "./MyDemands";
import {Badge} from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  padding: {
    padding: theme.spacing(0, 2),
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className={classes.root}>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab label={`Mes projets (${props.user.initiatedProjects.length})`} {...a11yProps(0)} />
                <Tab label={
                  <Badge className={classes.padding} color="secondary" badgeContent={props.user.joinDemands.filter(demand => (demand.status === 'En attente')).length > 0 ? props.user.joinDemands.filter(demand => (demand.status === 'En attente')).length : undefined}>
                    Mes demandes ({props.user.joinDemands.length})
                  </Badge>}
                     {...a11yProps(1)}
                />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <MyProjects {...props} initiatedProjects={props.user.initiatedProjects}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <MyDemands {...props} demands={props.user.joinDemands}/>
            </TabPanel>
          </div>
        </div>
      </div>
    </div>
  );
}
