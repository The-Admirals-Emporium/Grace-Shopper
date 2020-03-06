import React from 'react';
import { Link } from 'react-router-dom';

const loginAndSecurity = props => {
  return (
    <div>
      <h2> Login and Security </h2>

      <h3>Name:</h3>
      <h4>#current user name</h4>
      <button
        type="button"
        size="small"
        color="primary"
        // onClick={}
      >
        Edit
      </button>

      <h3>Email:</h3>
      <h4>#current user email</h4>
      <button
        type="button"
        size="small"
        color="primary"
        // onClick={}
      >
        Edit
      </button>

      <h3>Mobile Phone Number:</h3>
      <h4></h4>
      <button
        type="button"
        size="small"
        color="primary"
        // onClick={}
      >
        Add
      </button>

      <h3>Password:</h3>
      <h4>*********</h4>
      <button
        type="button"
        size="small"
        color="primary"
        // onClick={}
      >
        Edit
      </button>

      <h3>Shipping Address:</h3>
      <h4>#current shipping address</h4>
      <button
        type="button"
        size="small"
        color="primary"
        // onClick={}
      >
        Edit
      </button>

      <h3>Two Step Verification (2SV) Setting:</h3>
      <h4>Manage your Two Step Vericification (2SV) Authenticators</h4>
      <button
        type="button"
        size="small"
        color="primary"
        // onClick={}
      >
        Add
      </button>
      <br></br>
      <button
        type="button"
        size="small"
        color="yellow"
        // onClick={}
      >
        Done
      </button>

      <Link to="/profile">
        <h2>Back to your profile</h2>
      </Link>
    </div>
  );
};

export default loginAndSecurity;
