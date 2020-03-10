import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class allUsersAdminView extends Component {
  render() {
    return (
      <div>
        <Link to="/admin-users">
          <h2>All users</h2>
        </Link>
        <h3>View, edit and maintain all users</h3>

        <Link to="/admin-products">
          <h2>All products</h2>
        </Link>
        <h3>View, edit and maintain all products</h3>

        <Link to="/admin-orders">
          <h2>All orders</h2>
        </Link>
        <h3>View, edit adn maintain all orders</h3>
      </div>
    );
  }
}

export default allUsersAdminView;
