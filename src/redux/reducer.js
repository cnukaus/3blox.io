import { SEARCH, FIND_RELAYER } from "./action";
import assets from '../data/assets'

export default function(state, action) {
  switch (action.type) {
    case SEARCH:
      const searchTerm = action.searchTerm.toLowerCase()
      return {...state, assets: assets.filter(asset => asset.symbol.toLowerCase().startsWith(searchTerm))}
    case FIND_RELAYER:
      const assetToBuy = action.assetToBuy

    default:
      return {...state, assets: assets}
  }
}