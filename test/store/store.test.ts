import { Store } from '../../src/store/store'

describe('Store', () => {
  let store: Store<number>

  beforeEach(() => {
    store = new Store(Symbol('testStore'), Number)
  })

  it('should initialize with the correct value', () => {
    expect(store.get()).toBeUndefined()
  })

  it('should update the value correctly', () => {
    store.set(5)
    expect(store.get()).toBe(5)
  })

  it('should notify subscribers when value changes', () => {
    const mockCallback = jest.fn()
    store.getSubscription().subscribe(mockCallback)

    store.set(10)
    expect(mockCallback).toHaveBeenCalledWith(10)
  })

  it('should stop notifying unsubscribed callbacks', () => {
    const mockCallback = jest.fn()
    const unsubscribe = store.getSubscription().subscribe(mockCallback)

    unsubscribe()
    store.set(15)
    expect(mockCallback).not.toHaveBeenCalledWith(15)
  })

  it('should not notify subscribers when value is the same', async () => {
    const mockCallback = jest.fn()

    // First set: initial value
    await store.set(0)

    // Subscribe to the store and invoke the callback
    store.getSubscription().subscribe(mockCallback)

    // Second set: change value to 1 and invoke the callback
    await store.set(1)

    // Third set: attempt to set the same value (1), ignore the callback
    await store.set(1)

    // Expect the callback to have been called twice: once for the subscription, and once for the second set
    expect(mockCallback).toHaveBeenCalledTimes(2)
  })

  it('should not notify subscribers when filter returns false', async () => {
    const mockCallback = jest.fn()
    store.getSubscription().subscribe(mockCallback)

    await store.set(20, { filter: () => false })
    expect(mockCallback).not.toHaveBeenCalledWith(20)
  })

  it('should call the callback with the current value when a function is passed to set', () => {
    const callback = jest.fn().mockImplementation(currentValue => currentValue + 10)
    store.set(0)
    store.set(callback)
    expect(callback).toHaveBeenCalledWith(0)
    expect(store.get()).toBe(10)
  })

  it('should throw an error when setting a value of the wrong type', async () => {
    await expect(store.set('wrong type' as any)).rejects.toThrow(`Value 'wrong type' must be of type ${Number.name}`)
  })
})
