import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MyProject from "./MyProject";
import {Badge} from "@material-ui/core";
import {fetch} from "../../services/dataAccess";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 500,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  padding: {
    padding: theme.spacing(0, 2),
  },
}));

export default function MyProjects(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [projects, setProjects] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // We call a new fetch because those data are too deep for the initial call in user accessor, so whenever we need
  // to get a fresh dashboard, reload this component too
  const fetchProjects = () => {
    const promises = [];
    props.initiatedProjects.forEach((project, index) => {

      promises.push(fetch(project['@id'])
        .then(response =>
          response
            .json()
        )
      )
    })

    Promise.all(promises).then(function(values) {
      const newProjects = [];
      values.forEach((value) => {
        newProjects.push(value)
      });

      setProjects(newProjects)
    });
  }

  const reloadMyProjects = () => {
    fetchProjects();
  }

  if (projects.length !== props.initiatedProjects.length) {
      reloadMyProjects();
  }

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {projects.length > 0 && projects.map((project, index) => (
          <Tab key={index} label={
            <Badge className={classes.padding} color="secondary" badgeContent={project.joinDemands.filter(demand => (demand.status === 'En attente')).length > 0 ? project.joinDemands.filter(demand => (demand.status === 'En attente')).length : undefined}>
              {project.pitch}
            </Badge>}
               {...a11yProps(index)}
          />
        ))}
      </Tabs>

      {projects.length > 0 && projects.map((project, index) => (
        <TabPanel key={index} value={value} index={index} className={'fg-2'}>
            <MyProject {...props} project={project} reloadMyProjects={() => reloadMyProjects()}/>
        </TabPanel>
      ))}
    </div>
  );
}
