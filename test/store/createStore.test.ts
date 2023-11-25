import { createStore } from '../../src/store/createStore'

describe('createStore', () => {
  it('should throw an error if no initial value is provided', async () => {
    await expect(createStore({ name: 'testStore', type: Number } as any)).rejects.toThrow(
      'Store must be initialized with a value'
    )
  })

  it('should throw an error if no initial name is provided', async () => {
    await expect(createStore({ initialValue: 0, type: Number } as any)).rejects.toThrow(
      'Store name must be of Type string'
    )
  })

  it('should create a new store with the provided name, initial value, and type', async () => {
    const store = await createStore({ name: 'testStore', initialValue: 0, type: Number })
    expect(store.get()).toBe(0)
    expect(typeof store.get()).toBe('number')
    expect(store.name.toString()).toBe('Symbol(testStore)')
  })

  it('should throw an error if an invalid type is provided', async () => {
    await expect(createStore({ name: 'testStore', type: Set, initialValue: 0 } as any)).rejects.toThrow(
      'Invalid type: Set'
    )
  })

  it('should create a store with a number type', async () => {
    const store = await createStore({ name: 'testStore', initialValue: 0, type: Number })
    expect(typeof store.get()).toBe('number')
  })

  it('should create a store with a string type', async () => {
    const store = await createStore({ name: 'testStore', initialValue: 'test', type: String })
    expect(typeof store.get()).toBe('string')
  })

  it('should create a store with a boolean type', async () => {
    const store = await createStore({ name: 'testStore', initialValue: true, type: Boolean })
    expect(typeof store.get()).toBe('boolean')
  })

  it('should create a store with an array type', async () => {
    const store = await createStore({ name: 'testStore', initialValue: [1, 2, 3], type: Array })
    expect(Array.isArray(store.get())).toBe(true)
  })

  it('should create a store with an object type', async () => {
    const store = await createStore({ name: 'testStore', initialValue: { key: 'value' }, type: Object })
    expect(typeof store.get()).toBe('object')
  })

  it('should throw an error when createStore is called with an initialValue that does not match the number type', async () => {
    await expect(createStore({ name: 'testStore', initialValue: 'not a number', type: Number })).rejects.toThrow(
      `Failed to create store: Value 'not a number' must be of type Number`
    )
  })

  it('should throw an error when createStore is called with an initialValue that does not match the string type', async () => {
    await expect(createStore({ name: 'testStore', initialValue: 123, type: String })).rejects.toThrow(
      `Failed to create store: Value '123' must be of type String`
    )
  })

  it('should throw an error when createStore is called with an initialValue that does not match the boolean type', async () => {
    await expect(createStore({ name: 'testStore', initialValue: 'not a boolean', type: Boolean })).rejects.toThrow(
      `Failed to create store: Value 'not a boolean' must be of type Boolean`
    )
  })

  it('should throw an error when createStore is called with an initialValue that does not match the array type', async () => {
    await expect(createStore({ name: 'testStore', initialValue: 'not an array', type: Array })).rejects.toThrow(
      `Failed to create store: Value 'not an array' must be of type Array`
    )
  })

  it('should throw an error when createStore is called with an initialValue that does not match the object type', async () => {
    await expect(createStore({ name: 'testStore', initialValue: 'not an object', type: Object })).rejects.toThrow(
      `Failed to create store: Value 'not an object' must be of type Object`
    )
  })
})
