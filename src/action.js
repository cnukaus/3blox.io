import {assetDataUtils} from '@0x/order-utils'
import {AssetProxyId} from '@0x/types'
import relayers from './relayers.json'
import requestAssetPairs from './assetPairs'
import async from 'async'
import axios from 'axios'

export const SEARCH = 'SEARCH'
export const GET_RELAYERS = 'GET_REPLAYERs'
export const RELAYERS_RECEIVED = 'RELAYERS_RECEIVED'

const relayersRequestSent = () => ({type: GET_RELAYERS})
const relayersReceived = (relayers) => {
  let assets = {}
  let validRelayers = []
  async.eachOfSeries(relayers, function (relayer, key, next) {
      console.log(relayer)
      requestAssetPairs(relayer.sra_http_endpoint).then((response) => {
        if (response.data && response.data.records) {
          console.log(relayer.sra_http_endpoint)
          response.data.records.forEach((record) => {
            if (record.assetDataA.assetData.toLowerCase().endsWith('2aaa39b223fe8d0a0e5c4f27ead9083c756cc2')) {
              //console.log('B', assetDataUtils.decodeERC20AssetData(record.assetDataB.assetData))
              if (!assets[record.assetDataB.assetData]) {
                assets[record.assetDataB.assetData] = record.assetDataB
              }
              if (!assets[record.assetDataB.assetData].relayers) {
                assets[record.assetDataB.assetData].relayers = []
              }
              assets[record.assetDataB.assetData].relayers.push(relayer.sra_http_endpoint)
            } else if (record.assetDataB.assetData.toLowerCase().endsWith('2aaa39b223fe8d0a0e5c4f27ead9083c756cc2')) {
              if (!assets[record.assetDataA.assetData]) {
                assets[record.assetDataA.assetData] = record.assetDataA
              }
              if (!assets[record.assetDataA.assetData].relayers) {
                assets[record.assetDataA.assetData].relayers = []
              }
              assets[record.assetDataA.assetData].relayers.push(relayer.sra_http_endpoint)
            }
          })
        }
        next()
      })
    },
    function () {
      async.eachOfSeries(assets, function(value, key, next) {
        let tokenAddress
        if(key.startsWith(AssetProxyId.ERC20)) {
          tokenAddress = assetDataUtils.decodeERC20AssetData(key).tokenAddress
        } else if(key.startsWith(AssetProxyId.ERC721)) {
          tokenAddress = assetDataUtils.decodeERC721AssetData(key).tokenAddress
        }
        if (tokenAddress) {
          axios.get(`http://api.ethplorer.io/getTokenInfo/${tokenAddress}?apiKey=freekey`).then((response) => {
            console.log(response.data)
            if (response.data.symbol) {
              assets[key].symbol = response.data.symbol
            }
            if (response.data.name) {
              assets[key].name = response.data.name
            }
            setTimeout(next, 2000)
          })
        } else {
          next()
        }
      }, function() {
        console.log(JSON.stringify(assets))
      })
    })

  return {type: RELAYERS_RECEIVED, relayers: validRelayers}
}

export function getRelayers() {
  return (dispatch) => {
    dispatch(relayersRequestSent())
    dispatch(relayersReceived(relayers))
  }
}