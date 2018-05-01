import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import HomeIcon from 'material-ui-icons/Home';
import Menu, { MenuItem } from 'material-ui/Menu';

import { logout } from '../actions';

//Set displayNames so simulation tests work
IconButton.displayName = 'IconButton';
MenuItem.displayName = 'MenuItem';
Typography.displayName = 'Typography';

const styles = {
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

export class Header extends Component {
  state = {
    anchorEl: null,
  };

  handleLogin = () => {
    // Workaround to avoid re-rendering & CORS issues Credit @jenovs https://github.com/jenovs & https://stackoverflow.com/questions/28392393/passport-js-after-authentication-in-popup-window-close-it-and-redirect-the-pa/29314111#29314111
    window.open('/auth/github', '_blank', 'width=300,height=400');
    this.setState({ anchorEl: null });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              component={Link}
              to="/"
              className={classes.menuButton}
              color="inherit"
              aria-label="Book"
            >
              <HomeIcon />
            </IconButton>
            <Typography
              component={Link}
              to="/"
              variant="title"
              color="inherit"
              className={classes.flex}
              style={{ textDecoration: 'none' }}
            >
              Speedstudy
            </Typography>
            {!this.props.auth.userName && (
              <div>
                <Button color="inherit" onClick={this.handleLogin}>
                  Login With Github
                </Button>
              </div>
            )}
            {this.props.auth.userName && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <Avatar alt="User Avatar" src={this.props.auth.avatarURL} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem
                    component={Link}
                    to={{ pathname: `/users/${this.props.auth.userName}` }}
                  >
                    My Page
                  </MenuItem>
                  <MenuItem onClick={this.props.logout}>Logout</MenuItem>
                  <MenuItem component={Link} to="/delete">
                    Delete Account
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.authReducer,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ logout }, dispatch);
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Header);
