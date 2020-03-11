import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllUsers } from '../store';

class adminAllUsers extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }

  render() {
    const { users } = this.props;

    return (
      <div>
        <h1>All users: </h1>
        <ul>
          {users.map(user => {
            return (
              <li key={user.id}>
                <h2>User ID: </h2>
                <h3>{user.id}</h3>
                <h2>User Email: </h2>
                <h3>{user.email}</h3>
              </li>
            );
          })}
        </ul>

        <Link to="/admin-panel">
          <h2>Back to your admin panel</h2>
        </Link>
      </div>
    );
  }
}

const mapState = state => {
  return {
    users: state.users,
  };
};
const mapDispatch = dispatch => {
  return {
    getAllUsers: () => dispatch(getAllUsers()),
  };
};

export default connect(mapState, mapDispatch)(adminAllUsers);

// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { getAllUsers } from '../store';

// import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';

// class adminAllUsers extends Component {
//   componentDidMount() {
//     this.props.getAllUsers();
//     console.log('hello', this.props.getAllUsers());
//   }

//   render() {
//     console.log('in admin all users');
//     const { users } = this.props;
//     const useStyles = makeStyles({
//       table: {
//         minWidth: 650,
//       },
//     });

//     const classes = useStyles();
//     return (
//       <div id="usersHero">
//         <TableContainer component={Paper}>
//           <Table className={classes.table} aria-label="simple table">
//             <TableHead>
//               <h1>All users: </h1>

//               <TableRow>
//                 <TableCell>Users</TableCell>
//                 <TableCell align="right">Cost</TableCell>
//                 <TableCell align="right">Add</TableCell>
//                 <TableCell align="right">Subtract</TableCell>
//                 <TableCell align="right">Remove</TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {users.map(user => {
//                 return (
//                   <TableRow key={user.id}>
//                     <TableCell align="right">{user.id}</TableCell>
//                     <TableCell align="right">{user.email}</TableCell>
//                     <TableCell align="right">
//                       <button type="button" size="small" color="primary">
//                         Add
//                       </button>
//                     </TableCell>
//                     <TableCell align="right">
//                       <button type="button" size="small" color="primary">
//                         Remove
//                       </button>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* <h1>All users: </h1>
//         <ul>
//           {users.map(user => {
//             return (
//               <li key={user.id}>
//                 <h2>User ID: </h2>
//                 <h3>{user.id}</h3>
//                 <h2>User Email: </h2>
//                 <h3>{user.email}</h3>
//               </li>
//             );
//           })}
//         </ul> */}

//         <Link to="/admin-panel">
//           <h2>Back to your admin panel</h2>
//         </Link>
//       </div>
//     );
//   }
// }

// const mapState = state => {
//   return {
//     users: state.users,
//   };
// };
// const mapDispatch = dispatch => {
//   return {
//     getAllUsers: () => dispatch(getAllUsers()),
//   };
// };

// export default connect(mapState, mapDispatch)(adminAllUsers);
