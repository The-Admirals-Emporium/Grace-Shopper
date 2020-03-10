import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getAllBoats,
  increaseQuantity,
  decreaseQuantity,
  updateCart,
  getUpdatedUserCart,
} from '../store';
import { Link } from 'react-router-dom';

import { costDisplay } from './utils';
// import { GridList } from '@material-ui/core';
// import { Button, TextField, GridList } from '@material-ui/core';

class BoatList extends Component {
  constructor() {
    super();
    this.add = this.add.bind(this);
  }
  componentDidMount() {
    this.props.getAllBoats();
  }
  add(boat) {
    // this.props.decreaseQuantity(boat.id); // TKTK this should be moved to purchase component. Don't modify inventory until you checkout item

    // replace with selected quantity in a second
    boat.quantity = 1;

    this.props.isLoggedIn
      ? this.props.addBoatToUserCart(
          this.props.user.id,
          this.props.userCart.id,
          boat
        )
      : this.props.addBoatToCart(boat);

    // TKTK reassign to local storage, async here?? here
  }
  render() {
    if (this.props.isLoggedIn) {
      console.log('re-rendering logged in cart', this.props.userCart);
    } else {
      console.log('re-rendering guest cart', this.props.cart);
    }

    const { boats } = this.props;

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

                <p>Cost: {costDisplay(boat.cost)}</p>
                <p>Inventory: {boat.inventory}</p>
                <button
                  type="button"
                  disabled={!boat.inventory}
                  size="small"
                  color="primary"
                  onClick={() => this.add(boat)}
                >
                  Add
                </button>
                {/* add onclick func */}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapState = state => {
  return {
    boats: state.boat.allBoats,
    user: state.user,
    cart: state.order,
    userCart: state.userOrder,
    isLoggedIn: !!state.user.id,
  };
};
const mapDispatch = dispatch => {
  return {
    getAllBoats: () => dispatch(getAllBoats()),
    increaseQuantity: id => dispatch(increaseQuantity(id)),
    decreaseQuantity: id => dispatch(decreaseQuantity(id)),
    addBoatToCart: boat => dispatch(updateCart(boat)),
    addBoatToUserCart: (userId, cartId, boat) =>
      dispatch(getUpdatedUserCart(userId, cartId, boat)),
  };
};

export default connect(mapState, mapDispatch)(BoatList);
