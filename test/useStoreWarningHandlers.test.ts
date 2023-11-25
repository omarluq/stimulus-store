import { warnDirectAccess } from '../src/useStoreWarningHandlers'

describe('useStoreWarningHandlers', () => {
  describe('warnDirectAccess', () => {
    let consoleWarnSpy: jest.SpyInstance

    beforeEach(() => {
      consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation()
    })

    afterEach(() => {
      consoleWarnSpy.mockRestore()
    })

    it('calls console.warn and returns true if isWarned is false', () => {
      const result = warnDirectAccess('test', false)
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "Warning: You are accessing the 'test' instance directly. Consider using 'onTestUpdate' and 'testValue' instead."
      )
      expect(result).toBe(true)
    })

    it('does not call console.warn and returns the original isWarned value if isWarned is true', () => {
      const result = warnDirectAccess('test', true)
      expect(consoleWarnSpy).not.toHaveBeenCalled()
      expect(result).toBe(true)
    })
  })
})
