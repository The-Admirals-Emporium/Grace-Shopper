import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

import STRIPE_PUBLISHABLE from './constants/stripe';
import PAYMENT_SERVER_URL from './constants/server';

// checkout component uses teh stripeCheckout that comes from the library installed. It receives personal props (name, description, amount ect.)

const CURRENCY = 'USD';

const fromDollarsToCent = amount => amount * 100;

const successPayment = data => {
  alert('Payment Successful!');
};

const errorPayment = data => {
  alert('Payment Unsuccessful!');
};

// change to async await trycatch
const onToken = (amount, description) => token =>
  axios
    .post(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromDollarsToCent,
    })
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({ name, description, amount }) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={fromDollarsToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />
);
