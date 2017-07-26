import React from 'react'
import classNames from 'classnames'

class Header extends React.Component {
  renderNav () {
    const currentTable = this.props.table
    const tables = this.props.tables

    const navLinks = Object.keys(tables).map((key, index) => {
      let name = tables[key]
      let link = name + 's'
      let clickHandler = () => this.props.clickHandler(name)
      let className = classNames({
        'navigation': true,
        'nav-link': true,
        'current': name === currentTable
      })

      return (name === currentTable)
        ? <a key={index} className={className}>{link}</a>
        : <a key={index} className={className} href='' onClick={clickHandler}>{link}</a>
    })

    return <div className='header-nav'>{navLinks}</div>
  }

  render () {
    const github = 'https://www.github.com/quan/persona5_items'
    const target = '_BLANK'
    const rel = 'noopener noreferrer'
    const title = 'Persona 5 Items'

    return (
      <div className='app-header'>
        <div className='header-title'>
          <h2 className='title'>
            <a href={github} target={target} rel={rel} className='uppercase'>
              {title}
            </a>
          </h2>
        </div>
        {this.renderNav()}
      </div>
    )
  }
}

export default Header
