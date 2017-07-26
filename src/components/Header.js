import React from 'react'

class Header extends React.Component {
  /* props */
  // table
  // tables
  // - KEY: name
  // clickHandler

  renderNav () {
    const currentTable = this.props.table
    const tables = this.props.tables

    const navLinks = Object.keys(tables).map((key, index) => {
      const name = tables[key]
      const link = name + 's'
      console.log(link)
      const classes = ['navigation', 'nav-link']

      if (name === currentTable) {
        classes.push('current')
        const className = classes.join(' ')

        return <a key={index} className={className}>{link}</a>
      } else {
        const className = classes.join(' ')
        const clickHandler = () => this.props.clickHandler(name)

        return <a key={index} className={className} href='' onClick={clickHandler}>{link}</a>
      }
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
