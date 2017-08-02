import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'

import {mount} from 'enzyme'

describe('App', () => {
  let app

  // Mount an instance of the App before each test
  beforeEach(() => {
    app = mount(<App />)
  })

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
  })

  it('defaults to shopping data', () => {
    // Check that the shopping link is initially marked 'current'
    const currentTableLink = app.find('a.current')
    expect(currentTableLink).toHaveLength(1)
    expect(currentTableLink).toEqual(app.find('a.shops'))

    // Check that other links are not marked 'current'
    expect(app.find('a.itemization.current')).toHaveLength(0)
    expect(app.find('a.gifts.current')).toHaveLength(0)
  })

  it('switches to gift data when the gift link is clicked', () => {
    const giftData = require('../data/gifts.data.json')
    const giftSchema = require('../data/gifts.schema.json')

    app.find('a.gifts').simulate('click')

    // Check that the App renders the correct number of columns
    const columns = giftSchema.columns
    const headers = app.find('th.table-header')
    expect(headers).toHaveLength(columns.length)

    // Check that the App renders the correct column header labels
    for (let index in columns) {
      const headerLabel = headers.at(index).text()
      const columnLabel = columns[index].label
      expect(headerLabel).toMatch(columnLabel)
    }

    // Check that the App renders the correct number of rows
    const rows = app.find('tr.table-row')
    if (rows.hasOwnProperty('length')) {
      expect(rows).toHaveLength(giftData.length)
    } else {
      throw Error('App did not render table rows')
    }

    // Check that the App renders the correct data for each item
    for (let rowIndex in giftData) {
      const cells = rows.at(rowIndex).find('td.table-cell')

      for (let columnIndex in columns) {
        const column = columns[columnIndex]
        // Check that the Table renders correct strings and numbers
        switch (column.type) {
          case 'String': case 'string':
          case 'Number': case 'number:':
            const cellValue = cells.at(columnIndex).text()
            const dataValue = giftData[rowIndex][column.label]
            expect(cellValue).toMatch(dataValue)
            break
          default:
            break
        }
      }
    }
  })

  describe('#filter', () => {
    it('filters table data when the SearchBar receives input', () => {
      const shopData = require('../data/shops.data.json')
      const searchbar = app.find('input.search')

      // Check that two items are rendered when filtering by 'Arginade'
      searchbar.simulate('change', {
        target: { value: 'Arginade' }
      })
      expect(app.find('tr.table-row')).toHaveLength(2)

      // Check that all items are rendered when the search bar is cleared
      searchbar.simulate('change', {
        target: { value: '' }
      })
      expect(app.find('tr.table-row')).toHaveLength(shopData.length)
    })

    it('matches items regardless of case', () => {
      const searchbar = app.find('input.search')
      const variations = [
        'durian-au-lait',
        'Durian-au-Lait',
        'DURIAN-AU-LAIT',
        'DURIAN-au-lait',
        'durian-AU-lait',
        'durian-au-LAIT'
      ]

      for (let spelling of variations) {
        searchbar.simulate('change', {
          target: {value: spelling}
        })
        expect(app.find('tr.table-row')).toHaveLength(1)
      }
    })

    it('filters table data after switching tables', () => {
      // Switch to Gifts table
      app.find('a.gifts').simulate('click')

      // Check that one item is rendered when filtering by 'snack pack'
      const searchbar = app.find('input.search')
      searchbar.simulate('change', {
        target: {value: 'snack pack'}
      })
      expect(app.find('tr.table-row')).toHaveLength(1)

      // Check that two items are rendered when filtering by 'uji matcha flan'
      searchbar.simulate('change', {
        target: {value: 'uji matcha flan'}
      })
      expect(app.find('tr.table-row')).toHaveLength(2)
    })
  })
})
