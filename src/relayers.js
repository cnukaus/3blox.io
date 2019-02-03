import axios from 'axios'

export default function() {
  return axios.get('https://raw.githubusercontent.com/RadarTech/0x-relayer-registry/master/relayers.json')
}