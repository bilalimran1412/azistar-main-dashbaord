function formatData(obj) {
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    return `{\n "NonJSON Response":${obj} \n}`
  }

  if (Object.keys(obj).length === 0) {
    return '{}'
  }

  const formattedEntries = Object.entries(obj).map(([key, value]) => {
    return `  "${key}": ${JSON.stringify(value)}`
  })

  return `{\n${formattedEntries.join(',\n')}\n}`
}

module.exports = { formatData }
