const router = require('express').Router();
const { Boat } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const boats = await Boat.findAll({
      // explicitly select only fields we intend to display to all users
      // name, imageUrl, description, cost
      attributes: ['id', 'name', 'imageUrl', 'description', 'cost'],
    });
    boats.forEach(boat => {
      boat.cost = '$ USD ' + (boat.cost / 100).toFixed(2);
    });
    res.json(boats);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
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
