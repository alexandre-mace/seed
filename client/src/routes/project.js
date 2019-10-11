import React from 'react';
import { Route } from 'react-router-dom';
import { List, Create, Update } from '../components/project/';
import Initiate from "../components/project/Initiate";
import ListingPage from "../pages/ListingPage";
import {PrivateRoute} from "../utils/PrivateRoute";
import ProjectPage from "../pages/ProjectPage";
import MemberProjectsPage from "../pages/MemberProjectsPage";
import FavoriteProjectsPage from "../pages/FavoriteProjectsPage";

export default [
  <PrivateRoute path="/initier-un-projet" component={Initiate} exact key="initiate" />,
  <Route path="/projects/create" component={Create} exact key="create" />,
  <Route path="/projects/edit/:id" component={Update} exact key="update" />,
  <Route path="/les-projets/:id" component={ProjectPage} key="show" />,
  <Route path="/les-projets" component={ListingPage} key="list" />,
  <PrivateRoute path="/mes-projets" component={MemberProjectsPage} key="member-projects-list" />,
  <PrivateRoute path="/mes-favoris" component={FavoriteProjectsPage} key="favorite-projects-list" />,
  <Route path="/projects/:page" component={List} exact key="page" />
];
