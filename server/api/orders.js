const router = require('express').Router();
const { Order, Boat, OrderBoats } = require('../db/models');
module.exports = router;

// To do: secure this route
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// To do: secure this route
router.get('/:id', async (req, res, next) => {
  try {
    console.log(req.params.id);
    const order = await Order.findByPk(req.params.id, {
      include: { model: Boat },
    });

    order.total = (order.total / 100).toFixed(2);

    res.json(order);
  } catch (err) {
    next(err);
  }
});

// To do: secure this route
// guests are getting an order without a user id
// persist order somehow on session object
router.post('/', async (req, res, next) => {
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

    orderWithBoats.total = (orderWithBoats.total / 100).toFixed(2);

    res.json(orderWithBoats);
  } catch (err) {
    next(err);
  }
});
