/* global $ jQuery */

import React from 'react'
import ReactDOM from 'react-dom'
import {mount} from 'enzyme'
import sinon from 'sinon'

import App from './App.js'
import Table from './Table.js'
import testData from '../data/test.data.json'
import testSchema from '../data/test.schema.json'

function createTableWithPattern (pattern) {
  const data = testData
  const schema = testSchema
  return <Table data={data} schema={schema} searchPattern={pattern} />
}

describe('Table', () => {
  var app

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
    sinon.spy(Table.prototype, 'initTableHeader')
    mount(createTableWithPattern(''))
    expect(Table.prototype.initTableHeader.calledOnce).toBe(true)
  })

  // Test the state of the Table immediately after mounting
  describe('initially', () => {
    it('renders correct shop data columns', () => {
      const shopSchema = require('../data/shops.schema.json')

      const columns = shopSchema.columns
      const headers = app.find('th.table-header')
      expect(headers).toHaveLength(columns.length)

      for (let index in columns) {
        const headerLabel = headers.at(index).text()
        const columnLabel = columns[index].label
        expect(headerLabel).toMatch(columnLabel)
      }
    })

    it('renders all shop data items', () => {
      const shopData = require('../data/shops.data.json')
      const shopSchema = require('../data/shops.schema.json')

      const rows = app.find('tr.table-row')
      expect(rows).toHaveLength(shopData.length)

      const columns = shopSchema.columns

      for (let rowIndex in shopData) {
        const cells = rows.at(rowIndex).find('td.table-cell')

        for (let columnIndex in columns) {
          const column = columns[columnIndex]

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
})
