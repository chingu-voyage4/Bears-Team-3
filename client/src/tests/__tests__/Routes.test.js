import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import MockProvider from '../mockProvider';
import Routes from './../../Routes';
import { Home, User } from './../../containers';

describe('Routes', () => {
  it('default path should redirect to Home component', () => {
    const wrapper = mount(
      <MockProvider>
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Routes />
        </MemoryRouter>
      </MockProvider>
    );
    expect(wrapper.find(Home)).toHaveLength(1);
  });

  it('/users/:userName path should redirect to User component', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/users/userName']} initialIndex={0}>
        <Routes />
      </MemoryRouter>
    );
    expect(wrapper.find(User)).toHaveLength(1);
  });
});
