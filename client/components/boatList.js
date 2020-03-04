import React, { useEffect, Component } from 'react';
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

// const BoatList = props => {
//   useEffect(() => {
//     props.dispatch(getAllBoats());
//   }, []);

//   // const boats = props.state.boat || [];
//   console.log(props, 'props in BoatList');
//   let boats = [];
//   if (props.boats.length > 0) boats = props.boats;

//   return (
//     <div>
//       <ol>
//         {/* {boats.map((boat, i) => {
//           // eslint-disable-next-line react/no-array-index-key
//           console.log('each', boats[i]);
//           return <li key={i}>{boat.name || boat}</li>;
//         })} */}

//         {boats.map(boat => {
//           return (
//             <li key={boat.id}>
//               <Link to={`boats/${boat.id}`}>
//                 <p>{boat.name}</p>
//               </Link>
//               <img src={boat.imageUrl} width="190" height="190" />
//               <p>Cost: {boat.cost}</p>
//             </li>
//           );
//         })}
//       </ol>
//     </div>
//   );
// };

// const mapState = state => {
//   console.log(state);
//   return {
//     boats: state.boat.allBoats,
//   };
// };
// // const mapDispatch = null;
// const mapDispatch = dispatch => {
//   return {
//     getAllBoats: () => dispatch(getAllBoats()),
//   };
// };

// export default connect(mapState, mapDispatch)(BoatList);
