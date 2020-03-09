import Payment from './payment';
import React from 'react';
import { connect } from 'react-redux';
import { costDisplay } from './utils';
import { Link } from 'react-router-dom';
import Checkout from './checkout';

// cart should be a stateless, functional component like grocery item in add groceries
const Cart = props => {
  // const localStorageCart = JSON.parse(window.localStorage.getItem('cart'));
  // TKTK sync these?

  let cart = props.isLoggedIn ? props.userCart : props.cart;

  if (cart) {
    return (
      <div>
        <h3>Status: {cart.status}</h3>
        <h3>Total: $ USD {cart.total}</h3>
        <ul>
          {cart.boats.map(boat => {
            return (
              <li key={boat.id}>
                <p>Name: {boat.name}</p>
                <p>Cost: {costDisplay(boat.cost)}</p>
                <p>Quantity: to-do</p>
                <button type="button" size="small" color="primary">
                  Remove
                </button>
              </li>
            );
          })}
          {/* <button type="button" size="small" color="primary">
            Checkout
          </button> */}

          <h3>
            Buy now: <Payment />
          </h3>

          <Link to="/checkout">
            <h3>Proceed to checkout</h3>
          </Link>
        </ul>
      </div>
    );
  } else {
    return 'no cart';
  }
};

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    cart: state.order,
    userCart: state.userOrder,
  };
};

export default connect(mapState)(Cart);
