import React from 'react';
import { Link } from 'react-router-dom';

const userProfile = props => {
  return (
    <div>
      <Link to="/uorders">
        <h2>Your Orders</h2>
      </Link>

      <h3>Track, return or buy things again</h3>
      <Link to="/security">
        <h2>Login and Security</h2>
      </Link>

      <h3>Edit login, name, mobile number and address</h3>
    </div>
  );
};

export default userProfile;
