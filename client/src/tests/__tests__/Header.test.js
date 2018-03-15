import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './../../containers/Header';

it('renders without crashing', () => {
  const classes = {
    test: test,
  };

  const snap = shallow(<Header classes={classes} />);
  expect(snap).toMatchSnapshot();
});
