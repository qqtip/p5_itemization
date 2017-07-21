import React from 'react'

class Header extends React.Component {
  renderNav () {
    const currentTable = this.props.table
    const tables = this.props.tables

    const navLinks = tables.map((name, index) => {
      const link = name + 's'
      let classes = ['navigation', 'nav-link']

      if (name === currentTable) {
        classes.push('current')
        return <a key={index} className={classes.join(' ')}>{link}</a>
      } else {
        const clickHandler = () => this.props.clickHandler(name)
        return <a key={index} className={classes.join(' ')} href='' onClick={clickHandler}>{link}</a>
      }
    })

    return <div className='header-nav'>{navLinks}</div>
  }

  render () {
    const github = 'https://www.github.com/quan/persona5_items'
    const target = '_BLANK'
    const rel = 'noopener noreferrer'

    return (
      <div className='app-header'>
        <div className='header-title'>
          <h2 className='title'>
            <a href={github} target={target} rel={rel} className='uppercase'>
              Persona 5 Items
            </a>
          </h2>
        </div>
        {this.renderNav()}
      </div>
    )
  }
}

export default Header