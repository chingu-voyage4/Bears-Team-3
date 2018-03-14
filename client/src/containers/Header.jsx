// import React, { Component } from 'react';
// import { connect } from 'react-redux';

// import * as actions from '../actions';

// class Header extends Component {
//   constructor(props) {
//     super(props);

//     this.handleLogin = this.handleLogin.bind(this);
//   }

//   handleLogin() {
//     // Workaround to avoid re-rendering & CORS issues Credit @jenovs https://github.com/jenovs & https://stackoverflow.com/questions/28392393/passport-js-after-authentication-in-popup-window-close-it-and-redirect-the-pa/29314111#29314111
//     window.open('/auth/github', '_blank', 'width=300,height=400');
//   }

//   renderContent() {
//     switch (this.props.auth) {
//       case null:
//         return;
//       case false:
//         return (
//           <button
//             type="button"
//             className="nav__login"
//             onClick={this.handleLogin}
//           >
//             Log In With Github
//           </button>
//         );
//       default:
//         return (
//           <div className="nav__logout">
//             <a href="/api/logout">Logout</a>
//           </div>
//         );
//     }
//   }

//   render() {
//     return <nav className="nav">{this.renderContent()}</nav>;
//   }
// }

// const mapStateToProps = state => ({
//   auth: state.authReducer,
// });

// export default connect(mapStateToProps, actions)(Header);
import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import Menu, { MenuItem } from 'material-ui/Menu';

import * as actions from '../actions';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  avatar: {
    margin: 10,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Header extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }

  state = {
    anchorEl: null,
  };

  handleLogin() {
    // Workaround to avoid re-rendering & CORS issues Credit @jenovs https://github.com/jenovs & https://stackoverflow.com/questions/28392393/passport-js-after-authentication-in-popup-window-close-it-and-redirect-the-pa/29314111#29314111
    window.open('/auth/github', '_blank', 'width=300,height=400');
    this.setState({ anchorEl: null });
  }

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
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              Speedstudy
            </Typography>
            {!this.props.auth && (
              <div>
                <Button color="inherit" onClick={this.handleLogin}>
                  Login With Github
                </Button>
              </div>
            )}
            {this.props.auth && (
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
                  <MenuItem onClick={this.props.logout}>Logout</MenuItem>
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

export default compose(withStyles(styles), connect(mapStateToProps, actions))(
  Header
);
