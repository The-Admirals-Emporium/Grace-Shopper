const router = require('express').Router();
const { Order, Boat } = require('../db/models');
const { isAdmin, isAdminOrCorrectUser, isSession } = require('./gateway.js');
const { changeBoatQuantity } = require('./utils');

var Promise = require('bluebird');

module.exports = router;

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    await Promise.map(orders, async function(order) {
      await order.calculateTotal();
      await order.save();
      return order;
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', isAdminOrCorrectUser, async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: { model: Boat },
    });

    res.json(order);
  } catch (err) {
    next(err);
  }
});

router.put(
  '/:id/:orderId/removeBoat',
  isAdminOrCorrectUser,
  async (req, res, next) => {
    try {
      const orderId = +req.params.orderId;
      let updateMe = await Order.findByPk(orderId, {
        include: [{ model: Boat }],
      });

      const boatId = +req.body.id;
      const dbBoat = await Boat.findByPk(boatId);

      await updateMe.removeBoat(dbBoat);
      await updateMe.calculateTotal();
      await updateMe.save();

      // Get and return new entry
      const updatedMe = await Order.findByPk(orderId, {
        include: [{ model: Boat }],
      });

      res.json(updatedMe.dataValues);
    } catch (err) {
      next(err);
    }
  }
);

// TO DO -- streamline this with other routes
router.put(
  '/:id/:orderId/:boatId/set',
  isAdminOrCorrectUser,
  async (req, res, next) => {
    try {
      let quantity = req.query.quantity;

      const orderId = +req.params.orderId;
      let updateMe = await Order.findByPk(orderId, {
        include: [{ model: Boat }],
      });

      const boatId = +req.params.boatId;
      const hasBoat = updateMe.boats.filter(boat => boat.id === boatId)[0];
      const dbBoat = await Boat.findByPk(boatId);

      if (hasBoat) {
        await updateMe.removeBoat(dbBoat);

        await changeBoatQuantity(updateMe, dbBoat, quantity);

        // Get and return new entry
        const updatedMe = await Order.findByPk(orderId, {
          include: [{ model: Boat }],
        });

        res.json(updatedMe.dataValues);
      } else {
        next(new Error(`boat ${boatId} does not exist for order ${orderId}`));
      }
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  '/:id/:orderId/addBoat',
  isAdminOrCorrectUser,
  async (req, res, next) => {
    try {
      let quantity = req.body.order_boats.quantity || 1;

      const orderId = +req.params.orderId;
      let updateMe = await Order.findByPk(orderId, {
        include: [{ model: Boat }],
      });

      const boatId = +req.body.id;
      const hasBoat = updateMe.boats.filter(boat => boat.id === boatId)[0];
      const dbBoat = await Boat.findByPk(boatId);

      if (hasBoat) {
        await updateMe.removeBoat(dbBoat);

        await changeBoatQuantity(
          updateMe,
          dbBoat,
          quantity + hasBoat.order_boats.quantity
        );
      } else {
        await changeBoatQuantity(updateMe, dbBoat, quantity);
      }

      // Get and return new entry
      const updatedMe = await Order.findByPk(orderId, {
        include: [{ model: Boat }],
      });

      res.json(updatedMe.dataValues);
    } catch (err) {
      next(err);
    }
  }
);

router.put('/:id/add', isAdminOrCorrectUser, async (req, res, next) => {
  try {
    const order = await Order.create();
    res.json(order);
  } catch (err) {
    next(err);
  }
});

router.put('/:id/subtract', isAdminOrCorrectUser, async (req, res, next) => {
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
