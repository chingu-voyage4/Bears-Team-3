import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './../../containers/Header';

it('renders without crashing', () => {
  const classes = {
    root: test,
    menuButton: test,
    flex: test,
  };

  const snap = shallow(<Header classes={classes} />);
  expect(snap).toMatchSnapshot();
});
