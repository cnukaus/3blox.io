import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import AssetCard from './components/Asset'
import assets from './assets'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  tile: {
    minWidth: 200
  }
});

const Page = (props) => {
  const {classes} = props;
  return (
    <div className={classes.root}>
      <GridList cellHeight={160} cols={8}>
        {assets.map((asset, index) => (
          <GridListTile key={index} cols={1} className={classes.tile}>
            <AssetCard asset={asset}/>
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}

export default withStyles(styles)(Page)
