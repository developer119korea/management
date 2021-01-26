import { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class NoticeRow extends Component {
  render() {
    const article = this.props.article;
    return (
      <TableRow onClick ={() => this.props.onClickOpen(article["id"])}>
        <TableCell>{article["title"]}</TableCell>
        <TableCell>{article["createdTime"]}</TableCell>
      </TableRow>
    );
  }
}

export default NoticeRow;