import React from 'react'

class TableHeader extends React.Component {
  renderColumn (column, index) {
    let className = 'table-header'
    if (column.hideOnMobile) {
      className += ' mobile-hidden'
    }
    if (column.isSortable) {
      className += ' sortable'
    }

    const label = column.label

    const clickHandler = (column.isSortable)
      ? this.props.clickHandler
      : () => {}

    return (
      <th
        key={index}
        className={className}
        onClick={() => clickHandler(label)}
      >{label}
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
