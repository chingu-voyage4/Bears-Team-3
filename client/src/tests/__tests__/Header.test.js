import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './../../containers/Header';

it('renders without crashing', () => {
  const classes = {
    root: {
      flexGrow: 1,
      textAlign: 'left',
    },
    flex: {
      flex: 1,
    },
    avatar: {
      margin: 10,
    },
  };

  const snap = shallow(<Header classes={classes} />);
  expect(snap).toMatchSnapshot();
});
