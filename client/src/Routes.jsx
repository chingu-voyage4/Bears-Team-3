import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home, Activities, User } from './containers';
import ActivityForm from './containers/activities/ActivityForm';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/users/:userName" component={User} />
    <Route exact path="/activities/:username" component={Activities} />
    <Route path="/activity/new" component={ActivityForm} />
  </Switch>
);

export default Routes;
