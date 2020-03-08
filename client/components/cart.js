import Payment from './payment';
import React from 'react';
import { costDisplay } from './utils';
import { Link } from 'react-router-dom';
import Checkout from './checkout';

// cart should be a stateless, functional component like grocery item in add groceries
const Cart = props => {
  const cart = props.cart;
  const localStorageCart = JSON.parse(window.localStorage.getItem('cart'));

  if (cart !== localStorageCart) {
    window.localStorage.setItem('cart', JSON.stringify(cart));
  }

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
                <button
                  type="button"
                  disabled={!boat.inventory}
                  size="small"
                  color="primary"
                >
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

export default Cart;
