import React from 'react'
import { connect } from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Dialog from '@material-ui/core/Dialog'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Header from '../components/Header'
import AssetCard from '../components/Asset'
import { acknowledge } from '../redux/actions'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'

const styles = (theme) => ({
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
  },
  progress: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30
  },
  circle: {
    margin: theme.spacing.unit * 2
  },
  notification: {
    textAlign: 'center',
    margin: 40,
  },
  button: {
    marginTop: 20
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
})

const mapStateToProps = state=>({
  assets: state.assets,
  loading: state.loading,
  assetToBuy: state.assetToBuy,
  relayer: state.relayer
})

const Page = (props) => {
  const {classes, assets, loading, assetToBuy, relayer} = props
  const ack = () => props.dispatch(acknowledge())
  const instantBuy = () => {
    const assetDataMap = {}
    assetDataMap[assetToBuy.assetData] = {}
    assetDataMap[assetToBuy.assetData].assetProxyId = assetToBuy.assetProxyId
    assetDataMap[assetToBuy.assetData].decimals = assetToBuy.decimals
    assetDataMap[assetToBuy.assetData].symbol = assetToBuy.symbol
    assetDataMap[assetToBuy.assetData].name = assetToBuy.name
    window.zeroExInstant.render({
      orderSource: relayer,
      availableAssetDatas: [assetToBuy.assetData],
      defaultSelectedAssetData: assetToBuy.assetData,
      additionalAssetMetaDataMap: assetDataMap,
      affiliateInfo: {
        feeRecipient: '0x88884e35d7006ae84efef09ee6bc6a43dd8e2bb8',
        feePercentage: 0.05
      },
    }, 'body')
  }
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
      <Dialog open={!!loading || loading === false && !relayer} className={classes.dialog}>
        {!!loading && <div className={classes.progress}>
          Searching best price
          <CircularProgress className={classes.circle}/>
        </div>}
        {!loading && <div className={classes.notification}>
          <div className={classes.info}>
            No sellers found now <SentimentVeryDissatisfiedIcon/>
          </div>
          <Button variant="contained" className={classes.button} color='primary' onClick={ack}>
            Ok
          </Button>
        </div>}
      </Dialog>
      { assetToBuy && relayer && instantBuy() }
    </div>
  )
}

export default withStyles(styles)(connect(mapStateToProps)(Page))
