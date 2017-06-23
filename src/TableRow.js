import React from 'react'

class TableRow extends React.Component {
  render () {
    return (
      <tr>
        <td>{this.props.item['Arcana']}</td>
        <td>{this.props.item['Persona']}</td>
        <td>{this.props.item['Itemization']}</td>
        <td>{this.props.item['Category']}</td>
        <td>{this.props.item['Description']}</td>
        <td>{this.props.item['HP / SP cost']}</td>
      </tr>
    )
  }
}

export default TableRow
