import async from 'async'
import axios from 'axios'
import {WETH} from '../utils/asset-data-retriever'

export const SEARCH_ASSET = 'SEARCH_ASSET'
export const SEARCH_RELAYER = 'SEARCH_RELAYER'
export const RELAYER_FOUND = 'RELAYER_FOUND'
export const RELAYER_NOT_FOUND = 'RELAYER_NOT_FOUND'

export function searchAsset(searchTerm) {
  return {
    type: SEARCH_ASSET,
    searchTerm: searchTerm
  }
}

const searchRelayer = () => ({type: SEARCH_RELAYER})
const found = (relayer, asset) => ({type: RELAYER_FOUND, relayer: relayer, asset: asset})
const notFound = () => ({type: RELAYER_NOT_FOUND})

export function findRelayer(assetToBuy) {
  return (dispatch) => {
    dispatch(searchRelayer())
    let bestRelayer
    let bestPrice
    async.eachOfSeries(assetToBuy.relayers, function (relayer, key, next) {
        let endPoint = relayer.endsWith('/') ? relayer : relayer + '/'
        let url = `${endPoint}orders?makerAssetData=${assetToBuy.assetData}&takerAssetData=${WETH}&perPage=1`
        axios.get(url).then(response => {
          if (response.data && response.data.records && response.data.records.length) {
            const order = response.data.records[0]
            const price = order.takerAssetAmount / order.makerAssetAmount
            if (!bestPrice && price < bestPrice) {
              bestPrice = price
              bestRelayer = relayer
            }
          }
          next()
        })
      },
      function () {
        if (bestRelayer) dispatch(found(bestRelayer, assetToBuy))
        else dispatch(notFound())
      }
    )
  }
}