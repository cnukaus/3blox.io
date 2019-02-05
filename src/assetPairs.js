import axios from 'axios'

export default function(endPoint) {
  return axios.get(endPoint + (endPoint.endsWith('/') ? '' : '/') + 'asset_pairs?page=1&perPage=1000')
}