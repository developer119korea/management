import { Component } from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  hidden: {
    display: 'none'
  }
});

class CustomerAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      userName: '',
      birthday: '',
      gender: '',
      job: '',
      fileName: '',
      open: false,
      errors: {},
    }
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    if (this.handleValidation()) {
      this.addCustomer()
        .then((response) => {
          this.props.stateRefresh();
        })
      this.setState({
        file: null,
        userName: '',
        birthday: '',
        gender: '',
        job: '',
        fileName: '',
        open: false,
        errors: {},
      })
    }
  }

  handleFileChange = (e) => {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.value,
    })
  }

  handleValueChange = (e) => {
    let nextState = this.state;
    nextState[e.target.name] = e.target.value;
    nextState["errors"][e.target.name] = null;
    this.setState(nextState);
  }

  addCustomer = () => {
    const url = '/api/customers';
    const formData = new FormData();
    if (this.state.file) {
      formData.append('image', this.state.file)
    }
    formData.append('name', this.state.userName)
    formData.append('birthday', this.state.birthday)
    formData.append('gender', this.state.gender)
    formData.append('job', this.state.job)
    const config = {
      headers: {
        'content-type': 'multipar/form-data'
      }
    }
    return post(url, formData, config);
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  }

  handleClose = () => {
    this.setState({
      file: null,
      userName: '',
      birthday: '',
      gender: '',
      job: '',
      fileName: '',
      open: false,
      errors: {},
    });
  }

  handleValidation() {
    let errors = {};
    let formIsValid = true;

    if (this.state.userName === '') {
      formIsValid = false;
      errors["userName"] = "Cannot be empty";
    }

    if (this.state.birthday === '') {
      formIsValid = false;
      errors["birthday"] = "Cannot be empty";
    }

    if (this.state.gender === '') {
      formIsValid = false;
      errors["gender"] = "Cannot be empty";
    }

    if (this.state.job === '') {
      formIsValid = false;
      errors["job"] = "Cannot be empty";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
          고객 추가하기
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>고객 추가</DialogTitle>
          <DialogContent>
            <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /><br />
            <label htmlFor="raised-button-file">
              <Button variant="contained" color="primary" component="span" name="file">
                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
              </Button>
            </label>
            <br />
            <TextField error={this.state.errors["userName"] ? true : false} required id="standard-required" label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br />
            <TextField error={this.state.errors["birthday"] ? true : false} required id="standard-required" label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /><br />
            <TextField error={this.state.errors["gender"] ? true : false} required id="standard-required" label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} /><br />
            <TextField error={this.state.errors["job"] ? true : false} required id="standard-required" label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /><br />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(CustomerAdd);