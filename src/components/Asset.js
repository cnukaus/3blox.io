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
  return <Card className={classes.card}>
    <CardContent>
      <Typography variant="h5" component="h2">
        {asset.symbol}
      </Typography>
      <Typography className={classes.pos} color="textSecondary">
        {asset.name}
      </Typography>
      <Typography component="p">
        <a href={'https://etherscan.io/token/' + asset.address} target='_blank'>Token Contract</a>
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" color="primary">Buy</Button>
    </CardActions>
  </Card>
}

export default withStyles(styles)(AssetCard);