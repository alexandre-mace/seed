export default function jsonLDFlattner(values) {
  return values.map(value => (value['@id']))
}
