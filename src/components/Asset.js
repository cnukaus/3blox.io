import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  card: {
    minWidth: 200,
    backgroundColor: 'wheat'
  },
  button: {
    margin: theme.spacing.unit,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const AssetCard = (props) => {
  const { classes, asset } = props
  const hello = () => {
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
    <CardContent>
      <Typography variant="h5" component="h2">
        {asset.symbol}
      </Typography>
      <Typography className={classes.pos} color="textSecondary">
        {asset.name}
      </Typography>
      <Typography component="p">
        <a href={'https://etherscan.io/token/' + asset.address} target='_blank' rel="noopener noreferrer">Token Contract</a>
      </Typography>
    </CardContent>
    <CardActions>
      <Button variant="outlined" color="primary" onClick={hello}>Buy</Button>
    </CardActions>
  </Card>
}

export default withStyles(styles)(AssetCard);