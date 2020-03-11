import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUserOrders } from '../store';
import { Link } from 'react-router-dom';

class userOrders extends Component {
  componentDidMount() {
    console.log('user order received props', this.props);
    //this.props.getAllUserOrders(this.props.user.id)
  }

  render() {
    // const { userOrders } = this.props
    return (
      <div>
        <h2> Your Orders </h2>

        <h3>Order:</h3>
        <h4>Orders placed in </h4>
        {/* add a drop down button where you can adjust the how far back to go */}
        <h4>#current user last order placed</h4>
        <h4>#current user order date </h4>
        <h4>#current user items ordered</h4>
        <button
          type="button"
          size="small"
          color="primary"
          // onClick={}
        >
          Track package
        </button>

        <button
          type="button"
          size="small"
          color="primary"
          // onClick={}
        >
          Return or replace items
        </button>
        <button
          type="button"
          size="small"
          color="primary"
          // onClick={}
        >
          Share gift receipt
        </button>

        <button
          type="button"
          size="small"
          color="primary"
          // onClick={}
        >
          Leave seller feedback
        </button>
        <button
          type="button"
          size="small"
          color="primary"
          // onClick={}
        >
          Write a product review
        </button>

        <h4>#current user last order placed</h4>
        <h4>#current user order date </h4>
        <h4>#current user items ordered</h4>
        <button
          type="button"
          size="small"
          color="primary"
          // onClick={}
        >
          Track package
        </button>

        <button
          type="button"
          size="small"
          color="primary"
          // onClick={}
        >
          Return or replace items
        </button>
        <button
          type="button"
          size="small"
          color="primary"
          // onClick={}
        >
          Share gift receipt
        </button>

        <button
          type="button"
          size="small"
          color="primary"
          // onClick={}
        >
          Leave seller feedback
        </button>
        <button
          type="button"
          size="small"
          color="primary"
          // onClick={}
        >
          Write a product review
        </button>

        <h4>#current user last order placed</h4>
        <h4>#current user order date </h4>
        <h4>#current user items ordered</h4>
        <button
          type="button"
          size="small"
          color="primary"
          // onClick={}
        >
          Track package
        </button>

        <button
          type="button"
          size="small"
          color="primary"
          // onClick={}
        >
          Return or replace items
        </button>
        <button
          type="button"
          size="small"
          color="primary"
          // onClick={}
        >
          Share gift receipt
        </button>

        <button
          type="button"
          size="small"
          color="primary"
          // onClick={}
        >
          Leave seller feedback
        </button>
        <button
          type="button"
          size="small"
          color="primary"
          // onClick={}
        >
          Write a product review
        </button>

        <Link to="/profile">
          <h2>Back to your profile</h2>
        </Link>
      </div>
    );
  }
}

const mapState = state => {
  return {
    userOrders: state.userOrders,
    user: state.user,
  };
};
const mapDispatch = dispatch => {
  return {
    getAllUserOrders: userId => dispatch(getAllUserOrders(userId)),
  };
};

export default connect(mapState, mapDispatch)(userOrders);
