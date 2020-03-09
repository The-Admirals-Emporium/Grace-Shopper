import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userCart } from '../store';

/**
 * COMPONENT
 */
class UserHome extends Component {
  componentDidMount() {
    this.props.loadUserData(this.props.user);
  }

  render() {
    const { email } = this.props;

    return (
      <div>
        <h3>Welcome sailor, {email}!</h3>
        <img
          src="https://res.cloudinary.com/bluewater/image/fetch/w_auto,h_1200,c_lfill,g_auto,f_auto/https://www.bluewateryachting.com/_uploads/website/brokerage/yachts/original/20190809195847000000_2131.jpg"
          size="100"
        />
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    user: state.user,
    cart: state.order,
    userCart: state.userCart,
  };
};

const mapDispatch = dispatch => {
  return {
    loadUserData(user) {
      dispatch(userCart(user)); // load user cart if user is logged in
    },
  };
};

export default connect(mapState, mapDispatch)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
};
