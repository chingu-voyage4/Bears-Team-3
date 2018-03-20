import React from 'react';
import { mount, shallow } from 'enzyme';
//import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';

import { Header } from './../../containers/Header';

describe('Header', () => {
  it('renders without crashing', () => {
    const classes = {
      root: test,
      menuButton: test,
      flex: test,
    };

    const snap = shallow(<Header classes={classes} />);
    expect(snap).toMatchSnapshot();
  });

  it('handleMenu should set anchorEl to event.currentTarget', () => {
    const classes = {
      root: test,
      menuButton: test,
      flex: test,
    };
    const wrapper = shallow(<Header classes={classes} />);
    const IconButton = wrapper.find('IconButton').at(1);
    console.log(IconButton);
    IconButton.simulate('click', {
      target: {
        value:
          '<button tabindex="0" class="MuiButtonBase-root-47 MuiIconButton-root-41 MuiIconButton-colorInherit-42" type="button" id="avatar" aria-haspopup="true" aria-owns="menu-appbar"><span class="MuiIconButton-label-46"><div class="MuiAvatar-root-87"><img alt="User Avatar" src="https://avatars2.githubusercontent.com/u/14152877?v=4" class="MuiAvatar-img-89"></div></span><span class="MuiTouchRipple-root-56"></span></button>',
      },
    });

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
