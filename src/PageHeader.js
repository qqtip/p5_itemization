import React from 'react'

class PageHeader extends React.Component {
  render () {
    return (
      <div className='app-header'>
        <h2 className='title'>{this.props.title}</h2>
      </div>
    )
  }
}

export default PageHeader
