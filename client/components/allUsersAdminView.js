import React, { Component } from 'react';

class AllUsersAdminView extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }

  render() {
    const { users } = this.props;
    return (
      <ul>
        {users.map(user => {
          // <Link to={`/users/${user.id}`}>
          return <li key={user.id}>user.name</li>;
        })}
      </ul>
    );
  }
}

export default AllUsersAdminView;
