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
  },
  total: {
    type: Sequelize.DECIMAL,
    defaultValue: 0.0,
  },
});

module.exports = Order;
