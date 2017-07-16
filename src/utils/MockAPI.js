import itemizationData from '../assets/data/itemizations.data.json'
import itemizationMeta from '../assets/data/itemizations.metadata.json'
import giftData from '../assets/data/gifts.data.json'
import giftMeta from '../assets/data/gifts.metadata.json'

const _data = {
  'itemization': {
    'data': itemizationData,
    'metadata': itemizationMeta
  },
  'gift': {
    'data': giftData,
    'metadata': giftMeta
  }
}

const MockAPI = {
  getData: (table) => {
    return _data[table].data
  },
  getMetadata: (table) => {
    return _data[table].metadata
  }
}
Object.freeze(MockAPI)

export default MockAPI
