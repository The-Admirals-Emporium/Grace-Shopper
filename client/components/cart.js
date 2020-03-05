import React from 'react';

// cart should be a stateless, functional component like grocery item in add groceries
const Cart = props => {
  const cart = props.cart || JSON.parse(window.localStorage.getItem('cart'));

  if (cart) {
    return (
      <div>
        <h3>Status: {cart.status}</h3>
        <h3>Total: $ USD {cart.total}</h3>
      </div>
    );
  } else {
    return 'no cart';
  }
};

export default Cart;
