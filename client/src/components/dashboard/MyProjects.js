import React from 'react';
import {fetch} from "../../services/dataAccess";
import MyProjectsMobile from "./MyProjectsMobile";
import MyProjectsDesktop from "./MyProjectsDesktop";

export default function MyProjects(props) {
  const [projects, setProjects] = React.useState([]);

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
    });

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
    <>
      <>
        <div className="d-none d-md-block">
          <MyProjectsDesktop projects={projects} {...props} reloadMyProjects={() => reloadMyProjects()}/>
        </div>

        <div className="d-block d-md-none">
          <MyProjectsMobile projects={projects} {...props} reloadMyProjects={() => reloadMyProjects()}/>
        </div>
      </>
    </>
  );
}
