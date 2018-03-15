import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './../../containers/Header';
import MockProvider from '../mockProvider';

it('renders without crashing', () => {
  const snap = shallow(
    <MockProvider>
      <Header classes={true} />
    </MockProvider>
  );
  expect(snap).toMatchSnapshot();
});
