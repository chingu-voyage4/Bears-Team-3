import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home, Activities, User } from './containers';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/users/:userName" component={User} />
    <Route exact path="/activities/:username" component={Activities} />
  </Switch>
);

export default Routes;
