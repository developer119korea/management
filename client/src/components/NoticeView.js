import { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

class NoticeView extends Component {
  handleClose = () => {
    this.props.onClickClose();
  }

  render() {
    const article = this.props.article;
    return (
      <div>
      { article ? 
      <div onClick={this.handleClose}>
        <Dialog open={article!==null} fullWidth={true}>
          <DialogTitle>{article["title"]}</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              {article["description"]}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
          </DialogActions>
        </Dialog>
      </div>
      : false
      }
      </div>
    );
  }
}

export default NoticeView