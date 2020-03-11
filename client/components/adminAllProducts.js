import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllBoats, increaseQuantity, decreaseQuantity } from '../store';
import { costDisplay } from './utils';

class adminAllProducts extends Component {
  constructor() {
    super();
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }
  componentDidMount() {
    console.log('in admin all products');
    this.props.getAllBoats();
  }

  increase(boatId) {
    this.props.increaseQuantity(boatId);
  }
  decrease(boatId) {
    this.props.decreaseQuantity(boatId);
  }
  render() {
    const { boats } = this.props;
    const disableIncrease = boats.quantity === 100;
    const disableDecrease = boats.quantity === 0;

    return (
      <div>
        <h1>All products: </h1>
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
                  size="small"
                  color="primary"
                  disabled={disableDecrease}
                  onClick={() => this.decrease(boat.id)}
                >
                  Decrease
                </button>
                <button
                  type="button"
                  size="small"
                  color="primary"
                  disabled={disableIncrease}
                  onClick={() => this.increase(boat.id)}
                >
                  Increase
                </button>
              </li>
            );
          })}
        </ul>

        <Link to="/admin-panel">
          <h2>Back to your admin panel</h2>
        </Link>
      </div>
    );
  }
}

const mapState = state => {
  return {
    boats: state.boat.allBoats,
  };
};
const mapDispatch = dispatch => {
  return {
    getAllBoats: () => dispatch(getAllBoats()),
    increaseQuantity: id => dispatch(increaseQuantity(id)),
    decreaseQuantity: id => dispatch(decreaseQuantity(id)),
  };
};

export default connect(mapState, mapDispatch)(adminAllProducts);
