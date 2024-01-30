import { checkStores } from '../../src/errors/useStoreErrorHandlers'

describe('useStoreErrorHandlers', () => {
  describe('checkStores', () => {
    it('throws an error if stores is undefined', () => {
      expect(() => checkStores(undefined)).toThrow(
        "'useStore' was called on a controller without a 'stores' static property. The 'stores' property is undefined.",
      )
    })

    it('throws an error if stores is an empty array', () => {
      expect(() => checkStores([])).toThrow(
        "'useStore' was called on a controller with an empty 'stores' static property. The 'stores' array should contain at least one store.",
      )
    })

    it('throws an error if stores is not an array', () => {
      expect(() => checkStores('not an array')).toThrow(
        "'useStore' was called on a controller with a 'stores' static property that is not an array.",
      )
    })

    it('does not throw an error if stores is a non-empty array', () => {
      expect(() => checkStores(['test'])).not.toThrow()
    })
  })
})
