import { createStore } from '../../src/store/createStore'
import { useStore } from '../../src/hooks/useStore'
import type { Store } from '../../src/store/store'
import type { StoreController } from '../../src/types/storeController'

describe('useStore', () => {
  let mockController: StoreController
  let testStore: Store

  function expectStoreValueToBe(value: any) {
    expect(testStore.get()).toBe(value)
  }

  beforeEach(async () => {
    console.warn = jest.fn()
    testStore = await createStore({ name: 'testStore', type: Number, initialValue: 0 })
    mockController = {
      constructor: {
        stores: [testStore]
      },
      onTestStoreUpdate: jest.fn(),
      disconnect: jest.fn(),
      context: jest.fn(),
      application: jest.fn(),
      scope: jest.fn(),
      element: jest.fn()
      // Add the other missing properties here...
    } as unknown as StoreController

    useStore(mockController)
  })

  it('should throw an error if useStore is called on a controller without a stores static property', () => {
    const noStoresController = {
      constructor: {},
      onTestStoreUpdate: jest.fn(),
      disconnect: jest.fn(),
      context: jest.fn(),
      application: jest.fn(),
      scope: jest.fn(),
      element: jest.fn()
      // Add the other missing properties here...
    } as unknown as StoreController
    expect(() => useStore(noStoresController)).toThrow(
      `'useStore' was called on a controller without a 'stores' static property. The 'stores' property is undefined.`
    )
  })

  it('should throw an error if useStore is called on a controller with an empty stores static property', () => {
    const emptyStoresController = {
      constructor: {
        stores: []
      },
      onTestStoreUpdate: jest.fn(),
      disconnect: jest.fn(),
      context: jest.fn(),
      application: jest.fn(),
      scope: jest.fn(),
      element: jest.fn()
      // Add the other missing properties here...
    } as unknown as StoreController
    expect(() => useStore(emptyStoresController)).toThrow(
      `'useStore' was called on a controller with an empty 'stores' static property. The 'stores' array should contain at least one store.`
    )
  })

  it('should throw an error if useStore is called on a controller with a stores static property that is not an array', () => {
    const notArrayStoresController = {
      constructor: {
        stores: 'not an array'
      },
      onTestStoreUpdate: jest.fn(),
      disconnect: jest.fn(),
      context: jest.fn(),
      application: jest.fn(),
      scope: jest.fn(),
      element: jest.fn()
      // Add the other missing properties here...
    } as unknown as StoreController
    expect(() => useStore(notArrayStoresController)).toThrow(
      `'useStore' was called on a controller with a 'stores' static property that is not an array.`
    )
  })

  it('should subscribe to stores and call update methods on value changes', () => {
    testStore.set(5)
    expect(mockController.onTestStoreUpdate).toHaveBeenCalledWith(5)
  })

  it('should allow direct access to store values on the controller', () => {
    testStore.set(10)
    expect(mockController.testStoreValue).toBe(10)
  })

  it('should allow direct access to store instances on the controller', () => {
    expect(mockController.testStore).toEqual(testStore)
  })

  it('should clean up subscriptions when controller disconnects', () => {
    const unsubscribe = jest.fn()
    jest.spyOn(testStore, 'getSubscription').mockReturnValue({
      subscribe: () => unsubscribe
    })

    // Call useStore to trigger the subscription
    useStore(mockController)

    mockController.disconnect()

    expect(unsubscribe).toHaveBeenCalled()
  })

  it('should add a getter for the store value to the controller', () => {
    testStore.set(7)
    expect(mockController.testStoreValue).toBe(7)
  })

  it('should add an update method to the controller', () => {
    mockController.updateTestStore(8)
    expect(mockController.onTestStoreUpdate).toHaveBeenCalledWith(8)
  })

  it("should notify each controller when the shared store's value is updated by any controller", () => {
    // Create a second controller that will subscribe to the same store as the first controller
    const mockController2 = {
      constructor: {
        stores: [testStore]
      },
      onTestStoreUpdate: jest.fn(),
      disconnect: jest.fn(),
      context: jest.fn(),
      application: jest.fn(),
      scope: jest.fn(),
      element: jest.fn()
      // Add the other missing properties here...
    } as unknown as StoreController
    // Assume that the controllers have a method to update the store's value
    useStore(mockController2)
    mockController.updateTestStore = (value: any) => testStore.set(value)
    mockController2.updateTestStore = (value: any) => testStore.set(value)

    // Controller 1 updates the value and verifies that Controller 2 is notified
    mockController.updateTestStore(5)
    expect(mockController2.onTestStoreUpdate).toHaveBeenCalledWith(5)
    expect(mockController2.testStoreValue).toBe(5)
    expect(mockController2.testStore).toEqual(testStore)

    // Controller 2 updates the value and verifies that Controller 1 is notified
    mockController2.updateTestStore(10)
    expect(mockController.onTestStoreUpdate).toHaveBeenCalledWith(10)
    expect(mockController.testStoreValue).toBe(10)
    expect(mockController.testStore).toEqual(testStore)
  })

  it('should call the callback with the current value when a function is passed to set', () => {
    const callback = jest.fn().mockReturnValue(10)
    testStore.set(callback)
    expect(callback).toHaveBeenCalledWith(0)
    expect(testStore.get()).toBe(10)
  })

  it("should update the store's value with the return value of the callback", () => {
    const callback = jest.fn(currentValue => currentValue + 5)
    testStore.set(callback)
    expect(testStore.get()).toBe(5)
  })

  it('should add setStoreValue method to controller', () => {
    const newValue: number = 5
    mockController.setTestStoreValue(newValue)
    expectStoreValueToBe(newValue)
  })

  it('should handle callbacks in setStoreValue method', () => {
    const newValue: number = 5
    mockController.setTestStoreValue((_prev: number) => newValue)
    expectStoreValueToBe(newValue)
  })

  it('should handle promises in setStoreValue method', async () => {
    const newValue = 5
    await mockController.setTestStoreValue(new Promise(resolve => resolve(newValue)))
    expectStoreValueToBe(newValue)
  })

  it('should warn when accessing store directly', () => {
    mockController.testStore.get()
    expect(console.warn).toHaveBeenCalledWith(
      `Warning: You are accessing the 'testStore' instance directly. Consider using 'onTestStoreUpdate' and 'testStoreValue' instead.`
    )
  })

  it('should not warn when using setStoreValue or accessing storeValue', () => {
    mockController.setTestStoreValue(15)
    mockController.testStoreValue
    expect(console.warn).not.toHaveBeenCalled()
  })

  it('should log a warning only once when store.get is accessed directly from the controller', async () => {
    mockController.testStore.get()
    expect(console.warn).toHaveBeenCalledTimes(1)
  })

  it('should log a warning only once when store.set is accessed directly from the controller', async () => {
    mockController.testStore.set(1)
    expect(console.warn).toHaveBeenCalledTimes(1)
  })
})
