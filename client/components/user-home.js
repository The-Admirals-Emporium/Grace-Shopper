import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const UserHome = props => {
  const { email } = props;

  return (
    <div>
      <h3>Welcome sailor, {email}!</h3>
      <img
        src="https://res.cloudinary.com/bluewater/image/fetch/w_auto,h_1200,c_lfill,g_auto,f_auto/https://www.bluewateryachting.com/_uploads/website/brokerage/yachts/original/20190809195847000000_2131.jpg"
        size="100"
      />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
  };
};

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
};
