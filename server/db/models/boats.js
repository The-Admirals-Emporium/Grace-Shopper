const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('boats', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  cost: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
})
