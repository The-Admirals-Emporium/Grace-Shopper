import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const Navbar = ({ handleClick, isLoggedIn, isAdmin, user }) => {
  return (
    <div>
      <h1>Have Yachts</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/boats">Boats</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            <Link to="/cart">Cart</Link>
            <Link to="/checkout">Checkout</Link>

            {isAdmin && <Link to="/allUsersAdminView">User Panel</Link>}
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <AppBar position="static">
              <Toolbar>
                <Button color="inherit">
                  <Link to="/ghome">Home</Link>
                </Button>
                <Button color="inherit">
                  <Link to="/boats">Boats</Link>
                </Button>
                <Button color="inherit">
                  <Link to="/cart">Cart</Link>
                </Button>
                <Button color="inherit">
                  <Link to="/checkout">Checkout</Link>
                </Button>
                <Button color="inherit">
                  <Link to="/login">Login</Link>
                </Button>
                <Button color="inherit">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </Toolbar>
            </AppBar>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    isAdmin: !!state.user.isAdmin,
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
