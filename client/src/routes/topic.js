import React from 'react';
import { Route } from 'react-router-dom';
import { List, Create, Update, Show } from '../components/topic/';

export default [
  <Route path="/topics/create" component={Create} exact key="create" />,
  <Route path="/topics/edit/:id" component={Update} exact key="update" />,
  <Route path="/topics/show/:id" component={Show} exact key="show" />,
  <Route path="/topics/" component={List} exact strict key="list" />,
  <Route path="/topics/:page" component={List} exact strict key="page" />
];
