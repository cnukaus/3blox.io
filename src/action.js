export const SEARCH = 'SEARCH'

export function search(searchTerm) {
  return {
    type: SEARCH,
    searchTerm: searchTerm
  }
}