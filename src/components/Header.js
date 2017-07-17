import React from 'react'

class Header extends React.Component {
  renderNav () {
    const currentTable = this.props.table
    const tables = this.props.tables

    const navLinks = tables.map((name, index) => {
      const link = name.charAt(0).toUpperCase() + name.slice(1) + 's'
      let classes = ['navigation', 'nav-link']

      if (name === currentTable) {
        classes.push('current')
        return <a key={index} className={classes.join(' ')}>{link}</a>
      } else {
        const clickHandler = () => this.props.clickHandler(name)
        return <a key={index} className={classes.join(' ')} href='' onClick={clickHandler}>{link}</a>
      }
    })

    return (
      <div className='header-nav'>
        {navLinks.reduce((prev, curr) => [prev, ' - ', curr])}
      </div>
    )
  }

  render () {
    return (
      <div className='app-header'>
        <div className='header-title'>
          <h2 className='title'>Persona 5 Items</h2>
        </div>
        {this.renderNav()}
      </div>
    )
  }
}

export default Header
