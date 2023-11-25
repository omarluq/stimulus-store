import {
  checkInitialValue,
  checkName,
  checkTypeConstructor,
  handleStoreSetError
} from '../../src/errors/createStoreErrorHandlers'
import { typeMap } from '../../src/store/storeValuesTypeMap'

describe('storeErrorHandlers', () => {
  describe('checkInitialValue', () => {
    it('throws an error if initialValue is undefined', () => {
      expect(() => checkInitialValue(undefined)).toThrowError('Store must be initialized with a value')
    })

    it('does not throw an error if initialValue is defined', () => {
      expect(() => checkInitialValue('test')).not.toThrow()
    })
  })

  describe('checkName', () => {
    it('throws an error if name is not a string', () => {
      expect(() => checkName(123 as any)).toThrowError('Store name must be of Type string')
    })

    it('does not throw an error if name is a string', () => {
      expect(() => checkName('test')).not.toThrow()
    })
  })

  describe('checkTypeConstructor', () => {
    it('throws an error if type is not a function', () => {
      expect(() => checkTypeConstructor('InvalidType')).toThrowError('Invalid type: InvalidType')
    })

    it('does not throw an error if type is a function', () => {
      const validType = Object.keys(typeMap)[0]
      expect(() => checkTypeConstructor(validType)).not.toThrow()
    })
  })

  describe('handleStoreSetError', () => {
    it('throws a new error with the same message if error is an instance of Error', () => {
      const error = new Error('Test error')
      expect(() => handleStoreSetError(error)).toThrowError('Failed to create store: Test error')
    })

    it('throws a generic error if error is not an instance of Error', () => {
      expect(() => handleStoreSetError('Test error')).toThrowError('An unknown error occurred while creating the store')
    })
  })
})
