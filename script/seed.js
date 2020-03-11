'use strict';
var Promise = require('bluebird');

const db = require('../server/db');
const { User, Order, Boat } = require('../server/db/models');

var ordersData = [
  { status: 'COMPLETED' },
  { status: 'PENDING' },
  { status: 'SHIPPED' },
  { status: 'CANCELLED' },
  { status: 'REFUNDED' },
];

var usersData = [
  { email: 'cody@email.com', password: '123', isAdmin: true },
  { email: 'murphy@email.com', password: '123' },
];

var usersDataWithOrders = [
  { email: 'cody@aol.com', password: '123' },
  { email: 'murphy@aol.com', password: '123' },
];

var boatNames = [
  'Aquaholic',
  'Pearl',
  'Forever Young',
  'Second Chance',
  'Squid Pro Quo',
  'More Cowbell',
  'Pegasus',
  "Feelin' Nauti",
  'Why Not',
  'High Maintenance',
  'Grace',
  'Freedom',
  'Seas the Day',
  'Therapy',
  'Second Wind',
  'Serenity',
  'Perservance',
  'Rum Runner',
  'Knot on Call',
  'Pura Vida',
  'Andiamo',
  'Irish Wake',
  'Adagio',
  'Ohana',
  'Oasis',
  'Happy Ours',
  'Firefly',
  'Serendipity',
  'Island Time',
  'No Regrets',
  'Liberty',
  'At Last',
  "Blue Moon's",
  'Black Pearl',
  'Amazing Grace',
  'Knot On-Call',
  'Wanderlust',
  'The Dog House',
  'Carpe Diem',
  'Summer Daze',
  'Aqua-Holic',
  'Wind Seeker',
  'Dream Weaver',
  'Hydrotherapy',
  'The Salt Shaker',
  'Sea Quest',
  'Lazy Daze',
  'Jolly Roger',
  'Bail Out',
  'On the Rocks',
  'Zephyr',
  'Namaste',
  'Comfortably',
  'The Black Pearl',
  'La Belle Vita',
  'Mojo',
  'No Worries',
  'Nauti Buoy',
  'Serenity Now',
  'Liquid Asset',
  "Miss Behavin'",
  'Blew ByYou',
  "It's About Time",
  'Dolce Vita',
  'The Good Life',
  'Natui Buoy',
  'Island Girl',
  'Happy Hours',
  'Journey',
  'Relentless',
];

var imageUrls = [
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00005246/webvb1292142.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00001056/webvb1290489.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00000208/webvb1320772.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00006850/webvb739808.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00004554/webvb739298.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00006816/webvb1544189.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00006806/webvb1508700.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00000775/webvb894307.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/10000694/webvb1536831.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00000979/webvb949445.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00000292/webvb730735.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00006727/webvb1632429.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00000551/webvb1283004_1.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00004550/webvb1602068.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/10000757/webvb1581192.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00006838/webvb1288813.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00008998/webvb1165532.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00006961/webvb1400480.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00006566/webvb708635.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00005911/webvb1521809.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/10000589/webvb1620635.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00008844/webvb1315108.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/10001152/webvb1636815.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00009405/webvb1508932.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00000875/webvb1593313.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/10000128/webvb1527994.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/content/imageunavailable.jpg?ext=.jpg&width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00007432/webvb1250381.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00000997/webvb1476708.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00006363/webvb1102140.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00004918/webvb1089395.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00004897/webvb1514779.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00009352/webvb1456828.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00007996/webvb1402978.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00006307/webvb1574504.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/10001116/webvb1621266.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00002286/webvb791748.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00001382/webvb1239109.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00008586/webvb833828.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00007904/webvb1311419.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00007089/webvb692731.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00000396/webvb1539235.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/10000302/webvb1548021.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00009755/webvb1364656.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00005249/webvb1222160.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00000956/webvb1632947.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00007213/webvb747963.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00006015/webvb1204702.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00006000/webvb686943.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00000925/webvb1580130.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00006430/webvb1397080.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00000107/webvb1397335.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00004738/webvb1534893.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00005802/webvb1618521.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00005918/webvb1298151.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00005845/webvb1584230.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00007378/webvb1546136.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00005829/webvb1585355.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00005749/webvb1447310.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00008340/webvb1329483.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00005779/webvb1449730.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00002206/webvb1415134.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00005743/webvb1573976.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00007961/webvb1533361.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00000097/webvb1157846.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00005864/webvb1154554.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00000149/webvb1440888.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00007149/webvb1530032.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/10001003/webvb1607011.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00005677/webvb1060923.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00004969/webvb673744.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00005655/webvb974634.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00005437/webvb1503656.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00005504/webvb1610443.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00008519/webvb1569108.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00004680/webvb1457429.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00005438/webvb1068734.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00009804/webvb1301094.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00000378/webvb1580609.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00006463/webvb1168225.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00001464/webvb1298201.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00008278/webvb1500475.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00005147/webvb1544769.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00000894/webvb1619248.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00004678/webvb660601.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00000715/webvb836305.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00004084/webvb1051589.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00006279/webvb1627306.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00004830/webvb1411277.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00007356/webvb1616526.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00004433/webvb656480.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00000899/webvb756727_1.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00005675/webvb1474268.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00005143/webvb1098576.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00004964/webvb1198062.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00005113/webvb1571122.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00005091/webvb1542992.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/10001101/webvb1620320.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00009647/webvb1346876.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00005253/webvb1168642.jpg?width=633&height=442&mode=crop',
  'https://www.burgessyachts.com/sitefiles/burgess/medialibrary/web-br/00000191/webvb1545807.jpg?width=633&height=442&mode=crop',
];

var boatsData = boatNames.slice(0, boatNames.length / 2).map((name, ind) => ({
  name: name,
  description: '',
  imageUrl: imageUrls[ind],
  cost: Math.floor(Math.random() * 1000000),
  inventory: Math.floor(Math.random() * 100),
}));

var boatsWithOrdersData = boatNames
  .slice(boatNames.length / 2)
  .map((name, ind) => ({
    name: name,
    description: '',
    imageUrl: imageUrls[ind],
    cost: Math.floor(Math.random() * 1000000),
    inventory: Math.floor(Math.random() * 100),
  }));

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.map(usersData, function(user) {
    return db.model('user').create(user);
  });

  console.log(`seeded ${users.length} users with no orders`);

  const usersWithOrders = await Promise.map(usersDataWithOrders, function(
    user
  ) {
    return db
      .model('user')
      .create(Object.assign(user, { orders: ordersData }), {
        include: [Order],
      });
  });

  console.log(`seeded ${usersWithOrders.length} users with multiple orders`);

  const boats = await Promise.map(boatsData, function(boat) {
    return db.model('boat').create(boat);
  });

  console.log(`seeded ${boats.length} boats with no orders`);

  const dbUsers = await User.findAll();
  const userIds = dbUsers.map(user => user.id);

  const boatsWithOrders = await Promise.map(boatsWithOrdersData, function(
    boat,
    ind
  ) {
    return db.model('boat').create(
      Object.assign(boat, {
        orders: ordersData
          .slice(ind)
          .map(order => Object.assign(order, { userId: userIds[ind] })),
      }),
      {
        include: [Order],
      }
    );
  });

  console.log(`seeded ${boatsWithOrders.length} boats with orders`);

  const ordersWithBoats = await Promise.map(ordersData, function(order, ind) {
    return db.model('order').create(
      Object.assign(order, {
        boats: boatsData.slice(ind),
      }),
      {
        include: [Boat],
      }
    );
  });

  console.log(`seeded ${ordersWithBoats.length} orders with multiple boats`);

  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
