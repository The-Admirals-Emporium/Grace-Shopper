import React from 'react';

const allUsersAdminView = props => {
  const isAdmin = false;
  if (!isAdmin) {
    return <p>Access forbidden</p>;
  } else {
    // only fire thunk to populate users into Redux store if user is an admin
    // map over users and display them to admin

    // one solution:
    // is session state is a user, ask them for a password
    // password will be hashed and matched with database
    // if password matches, then user isAdmin

    return <p>Welcome, Admin</p>;
  }
};

export default allUsersAdminView;
