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

//     it('a robot may belong to many projects', async () => {
//       const openPodBayDoors = await Project.create({ title: 'Open the pod bay doors' })
//       const makePizza = await Project.create({ title: 'Make pizza' })
//       const hal9000 = await Robot.create({ name: 'HAL-9000' })
//       await hal9000.addProjects([openPodBayDoors, makePizza])
//       const hal9000sProjects = await hal9000.getProjects().map(title => title.title)
//       expect(hal9000sProjects).to.deep.equal(['Open the pod bay doors', 'Make pizza'])
//     })

//   })
