import itemizationData from '../data/itemizations.data.json'
import itemizationSchema from '../data/itemizations.schema.json'
import giftData from '../data/gifts.data.json'
import giftSchema from '../data/gifts.schema.json'
import shopData from '../data/shops.data.json'
import shopSchema from '../data/shops.schema.json'

const _data = {
  'itemization': {
    'data': itemizationData,
    'schema': itemizationSchema
  },
  'gift': {
    'data': giftData,
    'schema': giftSchema
  },
  'shop': {
    'data': shopData,
    'schema': shopSchema
  }
}

const FakeAPI = Object.freeze({
  get: {
    data: (table) => {
      return _data[table].data
    },
    schema: (table) => {
      return _data[table].schema
    }
  }
})

export default FakeAPI
