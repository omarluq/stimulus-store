import { checkStores } from '../src/useStoreErrorHandlers'

describe('useStoreErrorHandlers', () => {
  describe('checkStores', () => {
    it('throws an error if stores is undefined or an empty array', () => {
      expect(() => checkStores(undefined)).toThrowError(
        "Error: 'useStore' was called on a controller without a 'stores' static property."
      )
      expect(() => checkStores([])).toThrowError(
        "Error: 'useStore' was called on a controller without a 'stores' static property."
      )
    })

    it('does not throw an error if stores is a non-empty array', () => {
      expect(() => checkStores(['test'])).not.toThrow()
    })
  })
})
