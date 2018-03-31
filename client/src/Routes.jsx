import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home, About, Activities } from './containers';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/activities" component={Activities} />
  </Switch>
);

export default Routes;
