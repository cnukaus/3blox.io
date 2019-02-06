import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Fab from '@material-ui/core/Fab';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import LinkIcon from '@material-ui/icons/Link'
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({

  card: {
    minWidth: 150,
    textAlign: 'center',
    backgroundColor: 'lightYellow',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column'
  },
  cardContent: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column'
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'center'
  },
  title: {
    fontSize: 14,
  },
  button: {
    marginBottom: 20
  }
});

const AssetCard = (props) => {
  const { classes, asset } = props
  const instantBuy = () => {
    const assetDataMap = {}
    assetDataMap[asset.assetData] = {}
    assetDataMap[asset.assetData].assetProxyId = asset.assetProxyId
    assetDataMap[asset.assetData].decimals = asset.decimals
    assetDataMap[asset.assetData].symbol = asset.symbol
    assetDataMap[asset.assetData].name = asset.name
    window.zeroExInstant.render({
      orderSource: asset.relayers[0],
      availableAssetDatas: [asset.assetData],
      defaultSelectedAssetData: asset.assetData,
      additionalAssetMetaDataMap: assetDataMap,
      affiliateInfo: {
        feeRecipient: '0x88884e35d7006ae84efef09ee6bc6a43dd8e2bb8',
        feePercentage: 0.05
      },
    }, 'body')
  }
  return <Card className={classes.card}>
    <CardContent className={classes.cardContent}>
      <Typography variant="h5" component="h2">
        {asset.symbol}
      </Typography>
      <Tooltip title='Token Contract on Etherscan'>
        <a href={'https://etherscan.io/token/' + asset.address} target='_blank' rel="noopener noreferrer">
          <LinkIcon/>
        </a>
      </Tooltip>
      <Typography className={classes.pos} color="textSecondary" component="p">
        {asset.name}
      </Typography>
    </CardContent>
    <CardActions className={classes.cardActions}>
      <Fab className={classes.button} onClick={instantBuy} color="primary"
           variant="extended"
           size="small">
        <AttachMoneyIcon/>
        Buy
      </Fab>
    </CardActions>
  </Card>
}

export default withStyles(styles)(AssetCard);