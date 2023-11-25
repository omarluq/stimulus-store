import { typeMap } from '../../src/store/storeValuesTypeMap'

describe('typeMap', () => {
  it('should map type names to their corresponding constructors', () => {
    expect(typeMap.String).toBe(String)
    expect(typeMap.Number).toBe(Number)
    expect(typeMap.Array).toBe(Array)
    expect(typeMap.Object).toBe(Object)
    expect(typeMap.Boolean).toBe(Boolean)
  })
})
