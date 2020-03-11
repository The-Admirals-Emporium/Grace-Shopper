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
  GuestHome,
  Cart,
  AllUsersAdminView,
  UserProfile,
  LoginAndSecurity,
  UserOrders,
  CheckoutNavbar,
  AdminAllUsers,
  AdminAllProducts,
  AdminAllOrders,
} from './components';
import { me, guestCart, getEditedUserCart, setUserCartQuantity } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    console.log('routes received props', this.props);
    this.props.loadInitialData(this.props.user);
    this.remove = this.remove.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
  }

  remove(boat) {
    // this.props.decreaseQuantity(boat.id); // TKTK this should be moved to purchase component. Don't modify inventory until you checkout item

    this.props.isLoggedIn
      ? this.props.removeBoatFromUserCart(
          this.props.user.id,
          this.props.userCart.id,
          boat
        )
      : this.props.addBoatToCart(boat);

    // TKTK reassign to local storage, async here?? here
  }

  changeQuantity(
    event,
    boatId,
    userId = this.props.user.id,
    orderId = this.props.userCart.id
  ) {
    let quantity = +event.target.value;

    this.props.isLoggedIn
      ? this.props.changeQuantityUserCart(
          this.props.user.id,
          this.props.userCart.id,
          boatId,
          quantity
        )
      : this.props.addBoatToCart(boatId);
  }

  render() {
    const { isLoggedIn } = this.props;
    const { isAdmin } = this.props;
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/ghome" component={GuestHome} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/boats" component={BoatList} />
        <Route exact path="/boats/:id" component={SingleBoat} />
        <Route
          exact
          path="/cart"
          render={props => (
            <Cart
              {...props}
              {...this.props}
              remove={this.remove}
              changeQuantity={this.changeQuantity}
            />
          )}
        />
        <Route exact path="/checkout" component={CheckoutNavbar} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path="/profile" component={UserProfile} />
            <Route path="/security" component={LoginAndSecurity} />
            <Route path="/uorders" component={UserOrders} />
            <Route path="/admin-users" component={AdminAllUsers} />
            <Route path="/admin-products" component={AdminAllProducts} />
            <Route path="/admin-orders" component={AdminAllOrders} />
            <Route exact path="/admin-panel" component={AllUsersAdminView} />
          </Switch>
        )}

        {isLoggedIn && isAdmin && (
          <Switch>
            {/* Routes placed here are only available to logged in admins */}

            {/* commented out for testing purposes */}
            <Route path="/admin-users" component={AdminAllUsers} />
            <Route path="/admin-products" component={AdminAllProducts} />
            <Route path="/admin-orders" component={AdminAllOrders} />
            <Route exact path="/admin-panel" component={AllUsersAdminView} />
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
    isAdmin: !!state.user.isAdmin,
    user: state.user,
    cart: state.order,
    userCart: state.userOrder,
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData(user) {
      dispatch(me());

      dispatch(guestCart(user));
    },
    removeBoatFromUserCart: (userId, cartId, boat) =>
      dispatch(getEditedUserCart(userId, cartId, boat)),
    changeQuantityUserCart: (userId, cartId, boatId, quantity) =>
      dispatch(setUserCartQuantity(userId, cartId, boatId, quantity)),
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
