const router = require('express').Router();
const { User, Order, Boat } = require('../db/models');
const { isAdmin, isCorrectUser } = require('./gateway.js');

module.exports = router;

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'isAdmin'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// TKTK move this to orders route
router.get('/:id', isCorrectUser, async (req, res, next) => {
  try {
    // TKTK we could possibly use findOrCreate here
    // TKTK calculate total
    // TKTK through-table just send back quantity

    // find an order that has boats
    const order = await Order.findOne({
      where: {
        userId: +req.params.id,
        status: 'PENDING',
      },
      attributes: ['id', 'status', 'shippingAddress', 'total'],
      include: [
        { model: Boat, attributes: ['id', 'cost', 'name', 'imageUrl'] },
      ],
    });

    const cart = order.dataValues;

    //cart.calculateTotal()

    res.json(cart);
  } catch (err) {
    next(err);
  }
});
