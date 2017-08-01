import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'

import {mount} from 'enzyme'

describe('App', () => {
  var app

  // Mount an instance of the App before each test
  beforeEach(() => {
    app = mount(<App />)
  })

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
  })

  it('defaults to shopping data', () => {
    const currentTableLink = app.find('a.current')
    expect(currentTableLink).toHaveLength(1)
    expect(currentTableLink).toEqual(app.find('a.shops'))

    expect(app.find('a.itemization.current')).toHaveLength(0)
    expect(app.find('a.gifts.current')).toHaveLength(0)
  })

  it('switches to gift data when the gift link is clicked', () => {
    const giftData = require('../data/gifts.data.json')
    const giftSchema = require('../data/gifts.schema.json')

    app.find('a.gifts').simulate('click')

    // Check that the columns match
    const columns = giftSchema.columns
    const headers = app.find('th.table-header')
    expect(headers).toHaveLength(columns.length)

    for (let index in columns) {
      const headerLabel = headers.at(index).text()
      const columnLabel = columns[index].label
      expect(headerLabel).toMatch(columnLabel)
    }

    // Check that the data matches
    const rows = app.find('tr.table-row')
    expect(rows).toHaveLength(giftData.length)

    for (let rowIndex in giftData) {
      const cells = rows.at(rowIndex).find('td.table-cell')

      for (let columnIndex in columns) {
        const column = columns[columnIndex]

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

  // it('filters table data when the SearchBar receives input', () => {
  //   app.find('input.search').simulate()
  // })
})
