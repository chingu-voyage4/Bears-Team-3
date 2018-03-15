import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './../../containers';
import MockProvider from '../mockProvider';

it('renders without crashing', () => {
  const snap = shallow(
    <MockProvider>
      <Header />
    </MockProvider>
  );
  expect(snap).toMatchSnapshot();
});
