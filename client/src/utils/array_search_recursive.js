export default function array_search_recursive(search, array) {
    if (array) {
      return array.some(row => row.hasOwnProperty('id') && row.id === search);
    }
}
