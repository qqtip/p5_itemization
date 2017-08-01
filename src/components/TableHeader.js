import React from 'react'
import classNames from 'classnames'

class TableHeader extends React.Component {
  renderColumn (column, index) {
    const label = column.label
    const className = classNames(label, 'table-header', {
      'mobile-hidden': column.mobileHidden,
      'sortable': column.sortable
    })
    const clickHandler = (column.sortable)
      ? this.props.clickHandler
      : () => {}

    return (
      <th key={index} className={className} onClick={() => clickHandler(column)}>
        {label}
      </th>
    )
  }

  render () {
    const columns = this.props.columns.map(
      (column, index) => this.renderColumn(column, index)
    )

    return (
      <thead className='table-header'>
        <tr className='table-header'>
          {columns}
        </tr>
      </thead>
    )
  }
}

export default TableHeader
