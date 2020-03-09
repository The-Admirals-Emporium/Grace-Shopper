import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUsers } from '../store';
import { Link } from 'react-router-dom';

class AllUsersAdminView extends Component {
  componentDidMount() {
    this.props.getAllUsers();
    console.log('hello', this.props.getAllUsers());
  }
  render() {
    const { users } = this.props;
    // console.log('state', this.state);
    console.log('in admin panel');
    console.log('users', this.props.users);

    return (
      <div>
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
      </div>
    );
  }
}

const mapState = state => {
  return {
    // boats: state.boat.allBoats,
    users: state.users,
  };
};
const mapDispatch = dispatch => {
  return {
    // getAllBoats: () => dispatch(getAllBoats()),
    getAllUsers: () => dispatch(getAllUsers()),
  };
};

export default connect(mapState, mapDispatch)(AllUsersAdminView);
