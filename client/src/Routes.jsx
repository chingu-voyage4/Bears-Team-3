import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home, Activities } from './containers';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/activities/:username" component={Activities} />
  </Switch>
);

export default Routes;
