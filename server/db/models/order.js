const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM(
      'PENDING',
      'AWAITING PAYMENT',
      'AWAITING FULFILLMENT',
      'COMPLETED',
      'SHIPPED',
      'CANCELLED',
      'REFUNDED'
    ),
    allowNull: false,
  },
  shippingAddress: {
    type: Sequelize.STRING,
    validate: {
      // replace with var require('address-validator');
      isValidShippingAddress(value) {
        console.log(value);
        if (value.length < 15)
          throw Error('Validation Error: shipping address is invalid');
      },
    },
  },
  total: {
    type: Sequelize.FLOAT,
    defaultValue: -1,
  },
});

module.exports = Order;
