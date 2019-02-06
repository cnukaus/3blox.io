const assetDataUtils = require('@0x/order-utils').assetDataUtils
const AssetProxyId = require('@0x/types').AssetProxyId

function inspect(assetData) {
  if (assetData.startsWith(AssetProxyId.ERC20)) {
    console.log(assetDataUtils.decodeERC20AssetData(assetData))
  } else if (assetData.startsWith(AssetProxyId.ERC721)) {
    console.log(assetDataUtils.decodeERC721AssetData(assetData))
  } else if (assetData.startsWith(AssetProxyId.MultiAsset)) {
    console.log(assetDataUtils.decodeMultiAssetData(assetData))
  } else {
    console.log('unrecognised asset')
  }
}

inspect('0xf47261b000000000000000000000000001da95f253122636d0776017311892835a15d9dd')