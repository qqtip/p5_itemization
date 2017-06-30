import React from 'react'

class TableHeader extends React.Component {
  renderSortableColumn (column) {
    const className = 'table-header sortable'
    const clickHandler = this.props.onClick

    return (
      <th className={className} onClick={() => clickHandler(column)}>
        {column}
      </th>
    )
  }

  render () {
    return (
      <thead className='table-header'>
        <tr className='table-header'>
          {this.renderSortableColumn('arcana')}
          {this.renderSortableColumn('persona')}
          {this.renderSortableColumn('level')}
          {this.renderSortableColumn('itemization')}
          {this.renderSortableColumn('category')}
          <th className='table-header mobile-hidden'>description</th>
          <th className='table-header'>cost</th>
        </tr>
      </thead>
    )
  }
}

export default TableHeader
