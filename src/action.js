import requestRelayers from './relayers'

export const SEARCH = 'SEARCH'
export const GET_RELAYERS = 'GET_REPLAYERs'
export const RELAYERS_RECEIVED = 'RELAYERS_RECEIVED'

const relayersRequestSent = () => ({type: GET_RELAYERS})
const relayersReceived = (relayers) => ({type: RELAYERS_RECEIVED, relayers: relayers})

export function getRelayers() {
  return (dispatch) => {
    dispatch(relayersRequestSent())
    requestRelayers().then(response => {dispatch(relayersReceived(response.data))})
  }
}