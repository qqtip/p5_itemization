import React from 'react'

class TableHeader extends React.Component {
  renderSortableColumn (column) {
    const className = 'table-header sortable'
    const onClick = this.props.onClick

    return (
      <th className={className} onClick={() => onClick(column)}>
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
          <th className='table-header mobile-hidden'>cescription</th>
          <th className='table-header'>cost</th>
        </tr>
      </thead>
    )
  }
}

export default TableHeader
