const router = require('express').Router();
const { Order, Boat, OrderBoats } = require('../db/models');
module.exports = router;

//checkout route for guest
router.post('/guest', async (req, res, next) => {
  // try {
  // } catch (error) {
  //   next(error);
  // }
});

//checkout route for user
