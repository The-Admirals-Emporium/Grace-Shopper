const Sequelize = require('sequelize');
const db = require('../db');

const OrderBoats = db.define('order_boats', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  // price
});

module.exports = OrderBoats;
