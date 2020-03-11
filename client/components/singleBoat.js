import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSingleBoat, updateCart, getUpdatedUserCart } from '../store';

class SingleBoat extends Component {
  constructor() {
    super();
    this.add = this.add.bind(this);
  }
  componentDidMount() {
    this.props.getSingleBoat(this.props.match.params.id);
  }
  add(boat) {
    // this.props.decreaseQuantity(boat.id); // TKTK this should be moved to purchase component. Don't modify inventory until you checkout item

    // replace with selected quantity in a second
    boat.order_boats = { quantity: 1 };

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
    const { boat } = this.props;

    return (
      <div>
        <center>
          <img src={boat.imageUrl} width="190" height="190" />
          <h2>Name: </h2>
          <h3>{boat.name}</h3>
          <h2>Description: </h2>
          <h3>{boat.description}</h3>
          <h3>Inventory: </h3>
          <h4>{boat.inventory}</h4>
          <button
            type="button"
            size="small"
            color="primary"
            onClick={() => this.add(boat)}
          >
            Add to cart
          </button>
        </center>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    boat: state.boat.singleBoat,
    user: state.user,
    cart: state.order,
    userCart: state.userOrder,
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSingleBoat: id => dispatch(getSingleBoat(id)),
    addBoatToCart: boat => dispatch(updateCart(boat)),
    addBoatToUserCart: (userId, cartId, boat) =>
      dispatch(getUpdatedUserCart(userId, cartId, boat)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleBoat);
