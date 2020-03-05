import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllBoats } from '../store';
import { Link } from 'react-router-dom';

class BoatList extends Component {
  componentDidMount() {
    this.props.getAllBoats();
  }
  render() {
    console.log('in all boats', this.props.boats);
    const { boats } = this.props;
    return (
      <div>
        <ul>
          {boats.map(boat => {
            return (
              <li key={boat.id}>
                <Link to={`/boats/${boat.id}`}>
                  <p>{boat.name}</p>
                </Link>
                <img src={boat.imageUrl} width="190" height="190" />
                <p>Cost: {boat.cost}</p>
                <button type="button" size="small" color="primary">
                  Purchase
                </button>
                {/* add onclick func */}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapState = state => {
  console.log(state);
  return {
    boats: state.boat.allBoats,
  };
};
const mapDispatch = dispatch => {
  return {
    getAllBoats: () => dispatch(getAllBoats()),
  };
};

export default connect(mapState, mapDispatch)(BoatList);
