import { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import CustomerRow from './CustomerRow';
import CustomerAdd from './CustomerAdd';

const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 1080
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  progress: {
    margin: theme.spacing(2)
  },
  tableHead: {
    fontSize: '1.0rem'
  },
})

class Customer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      complete: 0,
      searchKeyword: '',
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      complete: 0,
      searchKeyword: '',
    });
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 50);
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render() {
    const filteredComponents = (data) => {
      data = data.filter((c) => {
        return c.name.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map((c) => {
        return <CustomerRow stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />
      });
    }
    const { classes } = this.props;
    const cellList = ["번호", "프로필 이미지", "이름", "생년월일", "성별", "직업", "설정"];
    return (
      <div className={classes.root}>
        <div className={classes.menu}>
          <CustomerAdd stateRefresh={this.stateRefresh} />
        </div>
        <Paper >
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {cellList.map((c, i) => { return <TableCell className={classes.tableHead} key={i}>{c}</TableCell> })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ? filteredComponents(this.state.customers) :
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress className={classes.progress} variant="indeterminate" value={this.state.completed} />
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
 }

export default withStyles(styles)(Customer); 