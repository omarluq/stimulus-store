import {
  checkValue,
  handlePromiseError,
} from '../../src/errors/storeErrorHandlers'

describe('storeErrorHandlers', () => {
  describe('checkValue', () => {
    it('throws an error if value is not of the correct type', () => {
      expect(() => checkValue('test', Number)).toThrow(
        "Value 'test' must be of type Number",
      )
    })

    it('does not throw an error if value is of the correct type', () => {
      expect(() => checkValue('test', String)).not.toThrow()
    })
  })

  describe('handlePromiseError', () => {
    it('throws a new error with the same message if error is an instance of Error', () => {
      const error = new Error('Test error')
      expect(() => handlePromiseError(error)).toThrow(
        'Failed to resolve promise:\nError: Test error',
      )
    })

    it('throws a new error with the stringified error if error is not an instance of Error', () => {
      expect(() => handlePromiseError('Test error')).toThrow(
        'Failed to resolve promise:\nTest error',
      )
    })
  })
})
