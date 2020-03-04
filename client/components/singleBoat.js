import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSingleBoat } from '../store/boat';

class SingleBoat extends Component {
  componentDidMount() {
    console.log('in single boat!');
    this.props.getSingleBoat(this.props.match.params.id);
  }
  render() {
    console.log('in single boat', this.props.boat);
    const { boat } = this.props;

    return (
      <div>
        <img src={boat.imageUrl} width="190" height="190" />
        <h2>Name: </h2>
        <h3>{boat.name}</h3>
        <h2>Description: </h2>
        <h3>{boat.description}</h3>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('mapping state to props in single boat', state);
  return {
    boat: state.boat.singleBoat,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSingleBoat: id => dispatch(getSingleBoat(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleBoat);
