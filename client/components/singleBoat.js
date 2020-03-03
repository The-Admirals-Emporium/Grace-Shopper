import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSingleBoat } from '../store/boat';

class singleBoat extends Component {
  componentDidMount() {
    console.log('in single boat!');
    this.props.getSingleBoat(this.props.match.params.id);
  }
  render() {
    return <h2>TESTTEST</h2>;
  }
}

// const mapStateToProps = state => {
//   console.log('mapping state to props in single boat', state);
//   return {
//     boat: state.singleBoat,
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    getSingleBoat: id => dispatch(getSingleBoat(id)),
  };
};

export default connect(null, mapDispatchToProps)(singleBoat);
