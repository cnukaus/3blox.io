import React from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import logo from './3box.io.min.svg'
import {searchAsset} from '../redux/actions'

const styles = theme => ({
  root: {
    width: '100%',
  },
  bar: {
    zIndex: 99
  },
  logo: {
    width: 210
  },
  grow: {
    flexGrow: 1,
    textAlign: 'center'
  },
  slogan: {
    fontSize: '1.2rem',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
  }

  search(event) {
    this.props.dispatch(searchAsset(event.target.value))
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.bar}>
          <Toolbar>
            <div className={classes.logo}>
              <img src={logo} height={50} alt='Logo'/>
            </div>
            <div className={classes.grow}>
              <Typography color="inherit" className={classes.slogan}>
                Buy tokens at best price through all 0x relayers
              </Typography>
            </div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon/>
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onKeyUp={this.search}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(connect()(Header));
