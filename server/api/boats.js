const router = require('express').Router();
const { Boat } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const boats = await Boat.findAll({
      // explicitly select only fields we intend to display to all users
      // name, imageUrl, description, cost
      attributes: ['name', 'imageUrl', 'description', 'cost'],
    });
    res.json(boats);
  } catch (err) {
    next(err);
  }
});
