import React from 'react'
import { connect } from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Header from '../components/Header'
import AssetCard from '../components/Asset'

const styles = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    marginLeft: 5,
    marginRight: 5,
  },
  grid: {
    paddingTop: 72
  },
  tile: {
    minWidth: 150,
  }
});

const mapStateToProps = state=>({
  assets: state.assets
});

const Page = (props) => {
  const {classes, assets} = props;
  return (
    <div className={classes.root}>
      <Header/>
      <GridList cellHeight={190} cols={6} className={classes.grid} id='grid'>
        {assets.map((asset, index) => (
          <GridListTile key={index} cols={1} className={classes.tile}>
            <AssetCard asset={asset}/>
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}

export default withStyles(styles)(connect(mapStateToProps)(Page))
