const router = require('express').Router();
const { Boat } = require('../db/models');
const { isUser } = require('./gateway.js');

module.exports = router;

router.get('/', isUser, async (req, res, next) => {
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

router.get('/:id', isUser, async (req, res, next) => {
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

router.put('/:id/increase', isUser, async (req, res, next) => {
  try {
    let increaseBoat = await Boat.findByPk(req.params.id);
    increaseBoat.inventory++;
    await increaseBoat.save();
    res.json(increaseBoat);
  } catch (error) {
    next(error);
  }
});

router.put('/:id/decrease', isUser, async (req, res, next) => {
  try {
    let decreaseBoat = await Boat.findByPk(req.params.id);
    decreaseBoat.inventory--;
    await decreaseBoat.save();
    res.json(decreaseBoat);
  } catch (error) {
    next(error);
  }
});
