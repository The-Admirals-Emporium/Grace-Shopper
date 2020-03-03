import React, { Component } from 'react';
import { connect } from 'react-redux';

class singleBoat extends Component {
  componentDidMount() {}
  render() {
    return <div />;
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(singleBoat);
