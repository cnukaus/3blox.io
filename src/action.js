import requestRelayers from './relayers'

export const SEARCH = 'SEARCH'
export const GET_RELAYERS = 'GET_REPLAYERs'
export const RELAYERS_RECEIVED = 'RELAYERS_RECEIVED'

const relayersRequestSent = () => ({type: GET_RELAYERS})
const relayersReceived = (relayers) => {
  let validRelayers = []
  relayers.forEach((relayer) => {
    for(let i = 0; i < relayer.networks.length; i++) {
      if (relayer.networks[i].networkId === 1) {
        let mainnetRelayer = {
          name: relayer.name,
          homepage_url: relayer.homepage_url,
          app_url: relayer.app_url,
        }
        if (relayer.networks[i].sra_http_endpoint) {
          mainnetRelayer.sra_http_endpoint = relayer.networks[i].sra_http_endpoint
        }
        if (relayer.networks[i].sra_ws_endpoint) {
          mainnetRelayer.sra_ws_endpoint = relayer.networks[i].sra_ws_endpoint
        }
        if (mainnetRelayer.sra_http_endpoint) {
          validRelayers.push(mainnetRelayer)
        }
        break
      }
    }
  });
  return {type: RELAYERS_RECEIVED, relayers: validRelayers}
}

export function getRelayers() {
  return (dispatch) => {
    dispatch(relayersRequestSent())
    requestRelayers().then(response => {dispatch(relayersReceived(response.data))})
  }
}