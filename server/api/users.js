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
    // TKTK calculate total
    // TKTK through-table just send back quantity

    let cart;
    // find an order that has boats
    const existingOrder = await Order.findOne({
      where: {
        userId: +req.params.id,
        status: 'PENDING',
      },
      attributes: ['id', 'status', 'shippingAddress', 'total'],
      include: [
        { model: Boat, attributes: ['id', 'cost', 'name', 'imageUrl'] },
      ],
    });

    if (existingOrder) {
      cart = existingOrder.dataValues;
    } else {
      // create new order for user
      const newOrder = await Order.create({
        attributes: ['id', 'status', 'shippingAddress', 'total'],
        include: [
          { model: Boat, attributes: ['id', 'cost', 'name', 'imageUrl'] },
        ],
      });

      // create associations
      const user = await User.findByPk(+req.params.id);
      await newOrder.setUser(user);
      await newOrder.save();

      cart = newOrder.dataValues;
    }

    //cart.calculateTotal()

    res.json(cart);
  } catch (err) {
    next(err);
  }
});
