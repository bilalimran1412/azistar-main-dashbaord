function formatData(obj) {
  if (Object.keys(obj).length === 0) {
    return '{}'
  }
  const formattedEntries = Object.entries(obj).map(([key, value]) => {
    return `  "${key}": ${JSON.stringify(value)}`
  })
  return `{\n${formattedEntries.join(',\n')}\n}`
}
module.exports = { formatData }
