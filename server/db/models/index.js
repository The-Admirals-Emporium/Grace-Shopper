const User = require('./user');
const Order = require('./order');
const Boat = require('./boat');
const OrderBoats = require('./orderboats');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/** Add instance methods here **/

Order.prototype.calculateTotal = async function() {
  const boats = await this.getBoats();

  const updatedTotal = boats.reduce(
    (currTotal, boat) => currTotal + boat.cost * boat.order_boats.quantity,
    0.0
  );

  this.total = updatedTotal;
};
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Boat.belongsToMany(Order, { through: OrderBoats });
Order.belongsToMany(Boat, { through: OrderBoats });

User.hasMany(Order);
Order.belongsTo(User);

module.exports = {
  User,
  Boat,
  Order,
};
