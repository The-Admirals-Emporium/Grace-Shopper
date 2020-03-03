import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchBoats } from '../store';

let fakeBoats = [
  'boat1',
  'Adnan',
  'Adrian',
  'Adrien',
  'Aedan',
  'Aedin',
  'Aedyn',
  'Aeron',
  'Afonso',
  'Ahmad',
  'Ahmed',
];

const BoatList = props => {
  useEffect(() => {
    props.dispatch(fetchBoats());
  }, []);

  // const boats = props.state.boat || [];
  console.log(props, 'props in BoatList');
  let boats = fakeBoats;
  if (props.boats.length > 0) boats = props.boats;
  return (
    <div>
      <ol>
        {boats.map((boat, i) => {
          // eslint-disable-next-line react/no-array-index-key
          return <li key={i}>{boat.name || boat}</li>;
        })}
      </ol>
    </div>
  );
};

const mapState = state => {
  return {
    boats: state.boat,
  };
};
const mapDispatch = null;

export default connect(mapState, mapDispatch)(BoatList);
