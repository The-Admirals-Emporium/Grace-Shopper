import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getAllBoats,
  increaseQuantity,
  decreaseQuantity,
  updateCart,
} from '../store';
import { Link } from 'react-router-dom';

import { costDisplay } from './utils';

class BoatList extends Component {
  componentDidMount() {
    this.props.getAllBoats();
    this.purchase = this.purchase.bind(this);
  }
  purchase(boat) {
    // fix this
    this.props.decreaseQuantity(boat.id); // TKTK this should be moved to purchase component
    this.props.addBoatToCart(boat);
    // TKTK reassign to local storage, async here?? here
  }
  render() {
    console.log('in all boats', this.props.boats);
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
                  onClick={() => this.purchase(boat)}
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
  console.log(state);
  return {
    boats: state.boat.allBoats,
    cart: state.cart,
  };
};
const mapDispatch = dispatch => {
  return {
    getAllBoats: () => dispatch(getAllBoats()),
    increaseQuantity: id => dispatch(increaseQuantity(id)),
    decreaseQuantity: id => dispatch(decreaseQuantity(id)),
    addBoatToCart: boat => dispatch(updateCart(boat)),
  };
};

export default connect(mapState, mapDispatch)(BoatList);
