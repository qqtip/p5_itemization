import React from 'react'

class TableHeader extends React.Component {
  /* props */
  // columns
  // clickHandler

  renderColumn (column, index) {
    const classes = ['table-header']
    if (column.hideOnMobile) {
      classes.push('mobile-hidden')
    }
    if (column.isSortable) {
      classes.push('sortable')
    }

    const label = column.label
    const className = classes.join(' ')
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
