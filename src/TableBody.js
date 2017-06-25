import React from 'react'

class TableRow extends React.Component {
  render () {
    const rowClass = this.props.isOdd ? 'odd-row' : 'even-row'
    const item = this.props.item

    return (
      <tr className={rowClass}>
        <td className='table-cell left-end'>{item['Arcana']}</td>
        <td className='table-cell'>{item['Persona']}</td>
        <td className='table-cell'>{item['Itemization']}</td>
        <td className='table-cell'>{item['Category']}</td>
        <td className='table-cell mobile-hidden'>{item['Description']}</td>
        <td className='table-cell right-end'>{item['Cost']}</td>
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
