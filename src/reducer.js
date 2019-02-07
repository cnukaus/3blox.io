import { SEARCH } from "./action";
import assets from './assets'

export default function(state, action) {
  switch (action.type) {
    case SEARCH:
      const searchTerm = action.searchTerm.toLowerCase()
      return {assets: assets.filter(
        asset => asset.symbol.toLowerCase().startsWith(searchTerm) || asset.name.toLowerCase().includes(searchTerm))}
    default:
      return {assets: assets}
  }
}