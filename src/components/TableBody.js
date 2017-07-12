import React from 'react'

class TableRow extends React.Component {
  render () {
    const rowClass = this.props.isOdd ? 'odd-row' : 'even-row'
    const item = this.props.item

    return (
      <tr className={rowClass}>
        <td className='table-cell left-end'>{item['arcana']}</td>
        <td className='table-cell'>{item['persona']}</td>
        <td className='table-cell'>{item['level']}</td>
        <td className='table-cell'>{item['itemization']}</td>
        <td className='table-cell'>{item['category']}</td>
        <td className='table-cell mobile-hidden'>{item['description']}</td>
        <td className='table-cell right-end'>{item['cost']}</td>
      </tr>
    )
  }
}

class TableBody extends React.Component {
  render () {
    const rows = this.props.data.map((item, index) => {
      const isOdd = (index % 2 === 0)
      return <TableRow key={index} item={item} isOdd={isOdd} />
    })

    return <tbody className='table-body'>{rows}</tbody>
  }
}

export default TableBody
