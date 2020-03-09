const router = require('express').Router();
const { Boat, Order } = require('../db/models');
const { isSession, isAdmin } = require('./gateway.js');

module.exports = router;

router.get('/', isSession, async (req, res, next) => {
  try {
    const boats = await Boat.findAll({
      // explicitly select only fields we intend to display to all users
      // name, imageUrl, description, cost
      attributes: [
        'id',
        'name',
        'imageUrl',
        'description',
        'cost',
        'inventory',
      ],
    });

    res.json(boats);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', isSession, async (req, res, next) => {
  try {
    const singleBoat = await Boat.findByPk(req.params.id);
    if (!singleBoat) {
      const error = Error('Sorry we currently do not have that boat listed');
      error.status = 404;
      return next(error);
    } else {
      res.json(singleBoat);
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:id/increase', isSession, async (req, res, next) => {
  try {
    let increaseBoat = await Boat.findByPk(req.params.id);
    increaseBoat.inventory++;
    await increaseBoat.save();
    res.json(increaseBoat);
  } catch (error) {
    next(error);
  }
});

router.put('/:id/decrease', isSession, async (req, res, next) => {
  try {
    let decreaseBoat = await Boat.findByPk(req.params.id);
    decreaseBoat.inventory--;
    await decreaseBoat.save();
    res.json(decreaseBoat);
  } catch (error) {
    next(error);
  }
});

// To do ... fix this route to use req.params.body
// when we create the Boat
router.post('/', isAdmin, async (req, res, next) => {
  try {
    // let's send back all info for now

    const boat = await Boat.create();

    const boatWithOrders = await Boat.findByPk(boat.id, {
      include: [
        {
          model: Order,
        },
      ],
    });

    res.json(boatWithOrders);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    const pk = req.params.id;
    const deleteMe = await Boat.findByPk(pk);

    await deleteMe.destroy();
    res.status(200).send(`boat id ${pk} successfully deleted`);
  } catch (err) {
    next(err);
  }
});
