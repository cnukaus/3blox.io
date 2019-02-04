import { SEARCH, GET_RELAYERS, RELAYERS_RECEIVED } from "./action";

export default function(state, action) {
  switch (action.type) {
    case SEARCH:
      return {amount: state.amount + action.amount}
    case GET_RELAYERS:
      console.log('get relayers')
      return {loading: true}
    case RELAYERS_RECEIVED:
      console.log('relayers received')
      return {loading: false, relayers: action.relayers}
    default:
      return {}
  }
}