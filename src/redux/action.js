export const SEARCH = 'SEARCH'
export const FIND_RELAYER = 'FIND_RELAYER'

export function search(searchTerm) {
  return {
    type: SEARCH,
    searchTerm: searchTerm
  }
}

export function findRelayer(assetToBuy) {
  return {
    type: FIND_RELAYER,
    assetToBuy: assetToBuy
  }
}