import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Login,
  Signup,
  UserHome,
  BoatList,
  SingleBoat,
  Cart,
} from './components';
import { me, cart } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData(this.props.user);
  }

  render() {
    const { isLoggedIn } = this.props;
    const { cart } = this.props;

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/boats" component={BoatList} />
        <Route exact path="/boats/:id" component={SingleBoat} />
        <Route exact path="/cart" component={Cart} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route
          exact
          path="/"
          render={props => (
            <Fragment>
              <Login {...props} />
              <BoatList />
            </Fragment>
          )}
        />
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user,
    cart: state.order,
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData(user) {
      console.log('load initial data got user', user);
      dispatch(me());
      dispatch(cart(user));
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
