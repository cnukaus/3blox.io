import { SEARCH_ASSET, SEARCH_RELAYER, RELAYER_FOUND, RELAYER_NOT_FOUND } from "./actions";
import assets from '../data/assets'

export default function(state, action) {
  switch (action.type) {
    case SEARCH_ASSET:
      const searchTerm = action.searchTerm.toLowerCase()
      return {...state, assets: assets.filter(asset => asset.symbol.toLowerCase().startsWith(searchTerm))}
    case SEARCH_RELAYER:
      return {assets: state.assets, loading: true}
    case RELAYER_FOUND:
      return {assets: state.assets, loading: false, relayer: action.relayer, assetToBuy: action.asset}
    case RELAYER_NOT_FOUND:
      return {assets: state.assets, loading: false}
    default:
      return {assets: assets}
  }
}