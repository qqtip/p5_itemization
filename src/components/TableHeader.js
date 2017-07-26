import React from 'react'
import classNames from 'classnames'

class TableHeader extends React.Component {
  /* props */
  // columns
  // clickHandler

  renderColumn (column, index) {
    const className = classNames({
      'table-header': true,
      'mobile-hidden': column.hideOnMobile,
      'sortable': column.isSortable
    })
    const label = column.label
    const clickHandler = (column.isSortable)
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
