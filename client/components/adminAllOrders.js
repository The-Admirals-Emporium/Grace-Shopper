import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllOrders } from '../store';
import { costDisplay } from './utils';

class adminAllOrders extends Component {
  componentDidMount() {
    this.props.getAllOrders();
  }
  render() {
    const { orders } = this.props;

    return (
      <div>
        <h1>All carts: </h1>
        <ul className="allOrders">
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
                <h3>{costDisplay(order.total)}</h3>
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
    orders: state.orders,
  };
};
const mapDispatch = dispatch => {
  return {
    getAllOrders: () => dispatch(getAllOrders()),
  };
};

export default connect(mapState, mapDispatch)(adminAllOrders);
