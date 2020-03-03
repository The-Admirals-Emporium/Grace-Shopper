const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('orders', {
  staus: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})
