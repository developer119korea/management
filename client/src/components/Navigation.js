import { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom';

import Link from '@material-ui/core/Link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import NotificationsIcon from '@material-ui/icons/Notifications';

const styles = theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
})


class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenDrawer: false,
    }
  }

  toggleDrawer = (open) => (event) => {
    console.log("toggleDrawer");
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({ isOpenDrawer: open });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={this.toggleDrawer(!this.state.isOpenDrawer)}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              콘텐츠 관리 시스템
            </Typography>
          </Toolbar>
        </AppBar>
        <div
          role="presentation"
          onClick={this.toggleDrawer(false)}
          onKeyDown={this.toggleDrawer(false)}
        >
          <Drawer open={this.state.isOpenDrawer}>
            <List>
                <Link component={RouterLink} to="/">
              <ListItem button key={"홈"}>
                  <HomeIcon />
                  <ListItemText primary={"홈"} />
              </ListItem>
                </Link>
                <Link component={RouterLink} to="/notice">
              <ListItem button key={"공지사항"}>
                  <NotificationsIcon />
                  <ListItemText primary={"공지사항"} />
              </ListItem>
                </Link>
                <Link component={RouterLink} to="/customer">
              <ListItem button key={"고객정보"}>
                  <PeopleIcon />
                  <ListItemText primary={"고객정보"} />
              </ListItem>
                </Link>
            </List>
          </Drawer>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Navigation);