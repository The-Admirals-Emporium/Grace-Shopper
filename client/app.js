import React from 'react';

import { Navbar, BoatList } from './components';
import Routes from './routes';
import Checkout from '../stripe/src/Checkout';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      {/* adjust fields below */}
      {/* <Checkout
        name="The Road to learn React"
        description="Only the Book"
        amount={1}
      /> */}
    </div>
  );
};

export default App;
