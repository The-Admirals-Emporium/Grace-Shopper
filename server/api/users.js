const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

async function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    const realUser = await User.findByPk(req.user.id);
    if (realUser) {
      next();
    } else {
      res.status('403').send('user is not an admin and is not in database');
    }
  } else {
    res.status('403').send('user is not an admin');
  }
}

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
