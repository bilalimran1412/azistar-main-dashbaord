function formatData(obj) {
  if (obj === null || typeof obj !== 'object') {
    return `{\n "NonJSON Response": ${obj} \n}`
  }

  if (Array.isArray(obj)) {
    const formattedArray = obj.map((item) => {
      return typeof item === 'object' ? formatData(item) : JSON.stringify(item)
    })
    return `[\n  ${formattedArray.join(',\n  ')}\n]`
  }

  if (Object.keys(obj).length === 0) {
    return '{}'
  }

  const formattedEntries = Object.entries(obj).map(([key, value]) => {
    if (typeof value === 'object') {
      return `  "${key}": ${formatData(value)}`
    }
    return `  "${key}": ${JSON.stringify(value)}`
  })

  return `{\n${formattedEntries.join(',\n')}\n}`
}

module.exports = { formatData }
