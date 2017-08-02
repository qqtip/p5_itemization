/* global $ jQuery */

import React from 'react'
import ReactDOM from 'react-dom'
import {mount} from 'enzyme'
import sinon from 'sinon'

import App from './App.js'
import Table from './Table.js'
import shopData from '../data/shops.data.json'
import shopSchema from '../data/shops.schema.json'

function createTableWithPattern (pattern) {
  const data = shopData
  const schema = shopSchema
  return <Table data={data} schema={schema} searchPattern={pattern} />
}

describe('Table', () => {
  let app

  // Mount an instance of the App before each test.
  beforeEach(() => {
    app = mount(<App />)
  })

  it('renders without crashing', () => {
    ReactDOM.render(
      createTableWithPattern(''),
      document.createElement('div')
    )
  })

  it('imports jQuery when constructed', () => {
    expect($).toBeDefined()
    expect(jQuery).toBeDefined()
  })

  it('initializes table headers when mounted', () => {
    sinon.spy(Table.prototype, 'componentDidMount')
    mount(createTableWithPattern(''))
    expect(Table.prototype.componentDidMount.calledOnce).toBe(true)
  })

  // Test the state of the Table immediately after mounting
  describe('initially', () => {
    it('renders correct shop data columns', () => {
      const shopSchema = require('../data/shops.schema.json')

      // Check that the Table renders the correct number of columns
      const columns = shopSchema.columns
      const headers = app.find('th.table-header')
      expect(headers).toHaveLength(columns.length)

      // Check that the Table renders the correct column header labels
      for (let index in columns) {
        const headerLabel = headers.at(index).text()
        const columnLabel = columns[index].label
        expect(headerLabel).toMatch(columnLabel)
      }
    })

    it('renders all shop data items', () => {
      // Check that the Table renders the correct number of rows
      const rows = app.find('tr.table-row')
      if (shopData.hasOwnProperty('length')) {
        expect(rows).toHaveLength(shopData.length)
      } else {
        throw Error('App did not render table rows')
      }

      const columns = shopSchema.columns
      // Check that the Table renders the correct data for each item
      for (let rowIndex in shopData) {
        const cells = rows.at(rowIndex).find('td.table-cell')

        for (let columnIndex in columns) {
          const column = columns[columnIndex]
          // Check that the Table renders correct strings and numbers
          switch (column.type) {
            case 'String': case 'string':
            case 'Number': case 'number:':
              const cellValue = cells.at(columnIndex).text()
              const dataValue = shopData[rowIndex][column.label]
              expect(cellValue).toMatch(dataValue)
              break
            default:
              break
          }
        }
      }
    })
  })

  describe('#sort()', () => {
    it('is called when the table header is clicked', () => {
      sinon.spy(Table.prototype, 'sort')

      // Simulate clicks on the table header
      const sortableHeaders = app.find('th.table-header.sortable')
      sortableHeaders.at(0).simulate('click')

      expect(Table.prototype.sort.calledOnce).toBe(true)
    })

    it('sorts shop data by items in non-decreasing', () => {
      const rows = app.find('tr.table-row')
      const count = rows.length

      // Simulate a click on the table header
      const itemHeader = app.find('th.table-header.item')
      itemHeader.simulate('click')

      // Check that the data is sorted in non-decreasing order
      let previous = ''
      for (let i = 0; i < count; i++) {
        const cellValue = rows.at(i).find('td.table-cell.item').text()
        expect(previous.localeCompare(cellValue)).toBeLessThanOrEqual(0)
        previous = cellValue
      }
    })
  })
})
