const { User } = require('../db/models');

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

function isUser(req, res, next) {
  const requesterId = req.user ? req.user.id : null;
  const requestedId = req.params.id;
  if (requesterId === requestedId) {
    next();
  } else {
    res
      .status('403')
      .send('user is not allowed to access another users orders');
  }
}

module.exports = { isAdmin, isUser };
