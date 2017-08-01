import React from 'react'
import classNames from 'classnames'

class TableRow extends React.Component {
  renderCell (column, index) {
    const columns = this.props.columns
    const label = column.label

    const className = classNames(
      label, 'table-cell', {
        'right-end': column === columns.slice(-1).pop(),
        'left-end': column === columns[0],
        'mobile-hidden': column.mobileHidden
      }
    )

    const item = this.props.item
    const data = Array.isArray(item[label])
      ? item[label].join(', ')
      : item[label]

    return <td key={index} className={className}>{data}</td>
  }

  render () {
    const className = classNames({
      'table-row': true,
      'odd-row': this.props.index % 2 === 0,
      'even-row': this.props.index % 2 === 1
    })

    const data = this.props.columns.map(
      (column, index) => this.renderCell(column, index)
    )

    return <tr className={className}>{data}</tr>
  }
}

class TableBody extends React.Component {
  render () {
    const columns = this.props.columns
    const rows = this.props.data.map(
      (item, index) => {
        return (
          <TableRow
            key={index} index={index}
            columns={columns} item={item}
          />
        )
      }
    )

    return <tbody className='table-body'>{rows}</tbody>
  }
}

export default TableBody
