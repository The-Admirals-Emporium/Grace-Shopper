const router = require('express').Router();
const { Boat } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    //if not logged in or not admin cannot see boats
    // if (!req.users || !req.isAdmin) {
    //   return res.send(403);
    // }
    const boats = await Boat.findAll({
      // explicitly select only fields we intend to display to all users
      // name, imageUrl, description, cost
      attributes: ['id', 'name', 'imageUrl', 'description', 'cost'],
    });
    res.json(boats);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    // if not logged in or not admin cannot see boats
    // if (!req.users || !req.isAdmin) {
    //   return res.send(403);
    // }
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

router.put('/:id/increase', async (req, res, next) => {
  try {
    let increaseBoat = await Boat.findByPk(req.params.id);
    increaseBoat.quantity++;
    await Boat.save();
    res.json(increaseBoat);
  } catch (error) {
    next(error);
  }
});

router.put('/:id/decrease', async (req, res, next) => {
  try {
    let decreaseBoat = await Boat.findByPk(req.params.id);
    decreaseBoat.quantity--;
    await Boat.save();
    res.json(decreaseBoat);
  } catch (error) {
    next(error);
  }
});
