import React, { Component } from 'react';

export default class GuestHome extends Component {
  render() {
    console.log('in guesthome');
    return (
      <div>
        <center>
          <h3>
            Welcome to Have Yachts! Feel free to cruise through our website!
          </h3>
        </center>

        <img
          src="https://images.unsplash.com/photo-1526761122248-c31c93f8b2b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
          size="100"
        />
      </div>
    );
  }
}
