import React from 'react'

class SearchBar extends React.Component {
  render () {
    const changeHandler = this.props.onChange

    return (
      <div className='search-wrapper'>
        <label className='search-label' htmlFor='search-bar'>
          <div className='search-label'>Search:</div>
          <input
            id='search-bar'
            className='search'
            placeholder='Search'
            onChange={changeHandler}
          />
        </label>
      </div>
    )
  }
}

export default SearchBar
