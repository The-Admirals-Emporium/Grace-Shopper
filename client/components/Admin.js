import React, { Fragment } from 'react';
import AllUsersAdminView from './allUsersAdminView';

const Admin = props => {
  console.log('Admin rendering');
  return (
    <p>
      Welcome, Admin <AllUsersAdminView />{' '}
    </p>
  );
};

export default Admin;
