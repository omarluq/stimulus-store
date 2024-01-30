import { createStore } from '../../src/store/createStore'

describe('createStore', () => {
  it('should throw an error if no initial value is provided', () => {
    expect(() =>
      createStore({ name: 'testStore', type: Number } as any),
    ).toThrow('Store must be initialized with a value')
  })

  it('should throw an error if no initial name is provided', () => {
    expect(() => createStore({ initialValue: 0, type: Number } as any)).toThrow(
      'Store name must be of Type string',
    )
  })

  it('should create a new store with the provided name, initial value, and type', () => {
    const store = createStore({
      name: 'testStore',
      initialValue: 0,
      type: Number,
    })
    expect(store.get()).toBe(0)
    expect(typeof store.get()).toBe('number')
    expect(store.name.toString()).toBe('Symbol(testStore)')
  })

  it('should throw an error if an invalid type is provided', () => {
    expect(() =>
      createStore({ name: 'testStore', type: Set, initialValue: 0 } as any),
    ).toThrow('Invalid type: Set')
  })

  it('should create a store with a number type', () => {
    const store = createStore({
      name: 'testStore',
      initialValue: 0,
      type: Number,
    })
    expect(typeof store.get()).toBe('number')
  })

  it('should create a store with a string type', () => {
    const store = createStore({
      name: 'testStore',
      initialValue: 'test',
      type: String,
    })
    expect(typeof store.get()).toBe('string')
  })

  it('should create a store with a boolean type', () => {
    const store = createStore({
      name: 'testStore',
      initialValue: true,
      type: Boolean,
    })
    expect(typeof store.get()).toBe('boolean')
  })

  it('should create a store with an array type', () => {
    const store = createStore({
      name: 'testStore',
      initialValue: [1, 2, 3],
      type: Array,
    })
    expect(Array.isArray(store.get())).toBe(true)
  })

  it('should create a store with an object type', () => {
    const store = createStore({
      name: 'testStore',
      initialValue: { key: 'value' },
      type: Object,
    })
    expect(typeof store.get()).toBe('object')
  })
})
