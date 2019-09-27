import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MyProjectMembers from "./MyProjectMembers";
import MyProjectDemands from "./MyProjectDemands";
import {fetch} from "../../services/dataAccess";

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
}));

export default function MyProject(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [project, setProject] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (project === null) {
    fetch(props.project['@id'])
      .then(response =>
        response
          .json()
          .then(retrieved => {
            setProject(retrieved)
          })
      )
      .catch(e => {
        console.log(e)
      });
  }

  return (
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
                <Tab label={`Les membres (${props.project.members.length})`} {...a11yProps(0)} />
                <Tab label={`Les Demandes (${props.project.joinDemands.length})`} {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <MyProjectMembers {...props} project={project} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <MyProjectDemands {...props} project={project} setProject={setProject}/>
            </TabPanel>
          </div>
  );
}
