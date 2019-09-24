import React from 'react';
import { Route } from 'react-router-dom';
import { List, Create, Update, Show } from '../components/discussion/';

export default [
  <Route path="/discussions/create" component={Create} exact key="create" />,
  <Route path="/discussions/edit/:id" component={Update} exact key="update" />,
  <Route path="/discussions/show/:id" component={Show} exact key="show" />,
  <Route path="/discussions/" component={List} exact strict key="list" />,
  <Route path="/discussions/:page" component={List} exact strict key="page" />
];
