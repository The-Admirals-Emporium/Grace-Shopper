import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCartFIXME } from '../store';
import { Link } from 'react-router-dom';

class Cart extends Component {
  componentDidMount() {
    // this.props.getCartFIXME();
  }
  render() {
    // const cart  = this.props.cart;
    // const boats = cart.boats

    const initialBoats = [
      {
        id: 1,
        name: 'Pearl',
        imageUrl: null,
        description: '',
        cost: 815750,
      },
      {
        id: 3,
        name: 'Forever Young',
        imageUrl: null,
        description: '',
        cost: 359150,
      },
      {
        id: 4,
        name: 'Squid Pro Quo',
        imageUrl: null,
        description: '',
        cost: 938932,
      },
      {
        id: 5,
        name: 'Second Chance',
        imageUrl: null,
        description: '',
        cost: 513856,
      },
      {
        id: 7,
        name: 'Pegasus',
        imageUrl: null,
        description: '',
        cost: 251078,
      },
      {
        id: 8,
        name: 'Why Not',
        imageUrl: null,
        description: '',
        cost: 235208,
      },
      {
        id: 9,
        name: "Feelin' Nauti",
        imageUrl: null,
        description: '',
        cost: 482434,
      },
      {
        id: 10,
        name: 'High Maintenance',
        imageUrl: null,
        description: '',
        cost: 667391,
      },
      {
        id: 11,
        name: 'Aquaholic',
        imageUrl: null,
        description: '',
        cost: 507032,
      },
    ];

    const BOATS_TO_MAKE = 25;

    const boats = [];

    for (let i = 0; i < BOATS_TO_MAKE; i++) {
      const boat = initialBoats[i % initialBoats.length];
      boat.id = boat.id + i;
      boat.name = boat.name + i;
      boats.push(boat);
    }

    return (
      <div>
        <ul>
          {boats.map(boat => {
            return (
              <li key={boat.id}>
                <Link to={`/boats/${boat.id}`}>
                  <p>{boat.name}</p>
                </Link>
                <img src={boat.imageUrl} width="190" height="190" />
                <p>Cost: {boat.cost}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapState = state => {
  console.log(state);
  return {
    // cart: state.cart,
  };
};
const mapDispatch = dispatch => {
  return {
    // getCart: () => dispatch(getCartFIXME()),
  };
};

export default connect(mapState, mapDispatch)(Cart);
