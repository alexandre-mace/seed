export default function jsonLDFlattner(values) {
  return values.map(value => {
    if (typeof value === 'object') {
      return value['@id']
    }
    return value;
  })
}
