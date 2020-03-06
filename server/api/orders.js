const router = require('express').Router();
const { Order, Boat, OrderBoats } = require('../db/models');
const { isAdmin, isCorrectUser, isSession } = require('./gateway.js');

module.exports = router;

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', isCorrectUser, async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: { model: Boat },
    });

    res.json(order);
  } catch (err) {
    next(err);
  }
});

router.put('/:id/add', isCorrectUser, async (req, res, next) => {
  try {
    const order = await Order.create();
    res.json(order);
  } catch (err) {
    next(err);
  }
});

router.put('/:id/subtract', isCorrectUser, async (req, res, next) => {
  try {
    const order = await Order.create();
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// To do: secure this route
// guests are getting an order without a user id
// persist order somehow on session object
router.post('/', isSession, async (req, res, next) => {
  try {
    // let's send back all info for now

    const order = await Order.create();

    const orderWithBoats = await Order.findByPk(order.id, {
      include: [
        {
          model: Boat,
        },
      ],
    });

    res.json(orderWithBoats);
  } catch (err) {
    next(err);
  }
});
