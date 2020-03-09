import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getSingleBoat,
  increaseQuantity,
  decreaseQuantity,
} from '../store/boat';

class SingleBoat extends Component {
  constructor() {
    super();
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }
  componentDidMount() {
    console.log('in single boat!');
    this.props.getSingleBoat(this.props.match.params.id);
  }
  increase() {
    this.props.increaseQuantity(this.props.match.params.id);
  }
  decrease() {
    this.props.decreaseQuantity(this.props.match.params.id);
  }
  render() {
    console.log('in single boat', this.props.boat);
    const { boat } = this.props;
    const disableIncrease = boat.quantity === 100;
    const disableDecrease = boat.quantity === 0;
    return (
      <div>
        <img src={boat.imageUrl} width="190" height="190" />
        <h2>Name: </h2>
        <h3>{boat.name}</h3>
        <h2>Description: </h2>
        <h3>{boat.description}</h3>
        <h3>Quantity: </h3>
        <h4>{boat.quantity}</h4>
        <button
          type="button"
          size="small"
          color="primary"
          disabled={disableDecrease}
          onClick={this.decrease}
        >
          Decrease
        </button>
        <button
          type="button"
          size="small"
          color="primary"
          disabled={disableIncrease}
          onClick={this.increase}
        >
          Increase
        </button>

        <button type="button" size="small" color="primary">
          Add to cart
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    boat: state.boat.singleBoat,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSingleBoat: id => dispatch(getSingleBoat(id)),
    increaseQuantity: id => dispatch(increaseQuantity(id)),
    decreaseQuantity: id => dispatch(decreaseQuantity(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleBoat);
