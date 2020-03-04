const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
    });
    //if not logged in or not admin cannot see users
    if (!req.users || !req.isAdmin) {
      return res.send(403);
    } else {
      res.json(users);
    }
  } catch (err) {
    next(err);
  }
});
