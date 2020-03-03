const { expect } = require('chai');
const db = require('../index');
const { User, Boat, Order } = require('../models');

describe('User >-< Order Association', () => {
  before(() => db.sync({ force: true }));
  afterEach(() => db.sync({ force: true }));

  describe('Sequelize Models', () => {
    it('a user may belong to many orders', async () => {
      const user = await User.create({ email: 'natiwhitney@gmail.com' });
      const orderInProgress = await Order.create({ status: 'PENDING' });
      const orderCompleted = await Order.create({ status: 'COMPLETED' });
      await user.addOrder([orderInProgress, orderCompleted]);
      const userOrders = await user.getOrders();
      expect(userOrders.map(order => order.status)).to.deep.equal([
        'PENDING',
        'COMPLETED',
      ]);
    });
  });
});

describe('Boat >-< Order Association', () => {
  let titanic;
  before(() => db.sync({ force: true }));
  beforeEach(() => {
    titanic = {
      name: 'RMS Titanic',
      description: 'A ship that cannot be sunk',
      cost: 1001,
    };
  });
  afterEach(() => db.sync({ force: true }));

  describe('Sequelize Models', () => {
    it('a boat contains many orders', async () => {
      const boat = await Boat.create(titanic);
      const order = await Order.create({ status: 'PENDING' });
      const order2 = await Order.create({ status: 'COMPLETED' });
      await boat.addOrder(order);
      await boat.addOrder(order2);

      const orders = await boat.getOrders();
      expect(orders.length).to.equal(2);
    });

    it('an order contains many boats', async () => {
      const boat = await Boat.create(titanic);
      const boat2 = await Boat.create(
        Object.assign(titanic, { name: 'the sea sluts' })
      );
      const order = await Order.create({ status: 'PENDING' });

      await order.addBoat(boat);
      await order.addBoat(boat2);

      const boats = await order.getBoats();
      expect(boats.length).to.equal(2);
    });
  });
});
