/** Returns a searchable string based on the type of data and its value. */
const searchValue = (type, value) => {
  switch (type) {
    case 'String': case 'string': default:
      return value.toLowerCase()
    case 'Array': case 'array':
      return value.join(' ').toLowerCase()
    case 'Number': case 'number':
      return String(value).toLowerCase()
  }
}

/**
 * Filters an array of data by a given pattern.
 * data    : an array of data
 * columns : an array containing column data
 * pattern : a search pattern
 */
module.exports = (data, columns, pattern) => {
  pattern = pattern.toLowerCase()
  console.log('filtering for pattern "' + pattern + '"')

  return data.slice().filter(item => {
    // check each field of the row for the search term
    for (let column of columns) {
      const field = column.label

      if (column.searchable) {
        const searchText = searchValue(column.type, item[field])
        // include the current item if a field matches
        if (searchText.indexOf(pattern) > -1) {
          return true
        }
      }
    }
    // filter items with no matching fields
    return false
  })
}
