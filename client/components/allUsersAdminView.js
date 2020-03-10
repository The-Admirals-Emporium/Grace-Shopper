import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getAllUsers,
  getAllBoats,
  getAllOrders,
  increaseQuantity,
  decreaseQuantity,
} from '../store';
import { Link } from 'react-router-dom';
import { costDisplay } from './utils';

class AllUsersAdminView extends Component {
  constructor() {
    super();
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }
  componentDidMount() {
    this.props.getAllUsers();
    this.props.getAllBoats();
    this.props.getAllOrders();
    console.log('hello', this.props.getAllUsers());
  }

  increase() {
    this.props.increaseQuantity(this.props.match.params.id);
  }
  decrease() {
    this.props.decreaseQuantity(this.props.match.params.id);
  }
  render() {
    const { users } = this.props;
    const { boats } = this.props;
    const { orders } = this.props;
    const disableIncrease = boats.quantity === 100;
    const disableDecrease = boats.quantity === 0;

    // console.log('state', this.state);
    console.log('in admin panel');
    console.log('users', this.props.users);

    return (
      <div>
        <h1>All users: </h1>
        <ul>
          {users.map(user => {
            return (
              <li key={user.id}>
                {/* <Link to={`/users/${user.id}`}> */}
                <h2>User ID: </h2>
                <h3>{user.id}</h3>
                <h2>User Email: </h2>
                <h3>{user.email}</h3>

                {/* </Link> */}
              </li>
            );
          })}
        </ul>
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
              </li>
            );
          })}
        </ul>
        <h1>All carts: </h1>
        <ul>
          {orders.map(order => {
            return (
              <li key={order.id}>
                <h2>User ID: </h2>
                <h3>{order.userId}</h3>
                <h2>Order ID: </h2>
                <h3>{order.id}</h3>
                <h2>Order status: </h2>
                <h3>{order.status}</h3>
                <h2>Order total: </h2>
                <h3>{order.total}</h3>
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
    users: state.users,
    orders: state.orders,
  };
};
const mapDispatch = dispatch => {
  return {
    getAllBoats: () => dispatch(getAllBoats()),
    getAllUsers: () => dispatch(getAllUsers()),
    getAllOrders: () => dispatch(getAllOrders()),
    increaseQuantity: id => dispatch(increaseQuantity(id)),
    decreaseQuantity: id => dispatch(decreaseQuantity(id)),
  };
};

export default connect(mapState, mapDispatch)(AllUsersAdminView);
