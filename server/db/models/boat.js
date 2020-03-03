const Sequelize = require('sequelize');
const db = require('../db');

const Boat = db.define('boat', {
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
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
});

module.exports = Boat;
