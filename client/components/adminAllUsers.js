import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllUsers } from '../store';

class adminAllUsers extends Component {
  componentDidMount() {
    this.props.getAllUsers();
    console.log('hello', this.props.getAllUsers());
  }

  render() {
    console.log('in admin all users');
    const { users } = this.props;

    return (
      <div>
        <h1>All users: </h1>
        <ul>
          {users.map(user => {
            return (
              <li key={user.id}>
                <h2>User ID: </h2>
                <h3>{user.id}</h3>
                <h2>User Email: </h2>
                <h3>{user.email}</h3>
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
    users: state.users,
  };
};
const mapDispatch = dispatch => {
  return {
    getAllUsers: () => dispatch(getAllUsers()),
  };
};

export default connect(mapState, mapDispatch)(adminAllUsers);
