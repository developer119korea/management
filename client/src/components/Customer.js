import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomerDelete from './CustomerDelete';

class Customer extends React.Component {
  render() {
    return (
      <TableRow>
        <TableCell>{this.props.id}</TableCell>
        <TableCell><img src={this.props.image ? this.props.image :"https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg"} alt="profile" width="64px" height="64px"/></TableCell>
        <TableCell>{this.props.name}</TableCell>
        <TableCell>{this.props.birthday}</TableCell>
        <TableCell>{this.props.gender}</TableCell>
        <TableCell>{this.props.job}</TableCell>
        <TableCell> <CustomerDelete stateRefresh={this.props.stateRefresh} id={this.props.id}></CustomerDelete> </TableCell>
      </TableRow>
    )
  }
}

export default Customer;