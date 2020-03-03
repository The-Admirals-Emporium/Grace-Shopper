import React from 'react';
import { connect } from 'react-redux';

const boats = [
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

const BoatList = () => {
  return (
    <div>
      <ol>
        {boats.map((boat, i) => {
          // eslint-disable-next-line react/no-array-index-key
          return <li key={i}>{boat}</li>;
        })}
      </ol>
    </div>
  );
};

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(BoatList);
