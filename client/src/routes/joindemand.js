import React from 'react';
import { Route } from 'react-router-dom';
import { List, Create, Update, Show } from '../components/joindemand/';

export default [
  <Route path="/join_demands/create" component={Create} exact key="create" />,
  <Route path="/join_demands/edit/:id" component={Update} exact key="update" />,
  <Route path="/join_demands/show/:id" component={Show} exact key="show" />,
  <Route path="/join_demands/" component={List} exact strict key="list" />,
  <Route path="/join_demands/:page" component={List} exact strict key="page" />
];
