import { Store } from '../src/store';
import { useStore } from '../src/useStore';
import type { StoreController } from '../src/storeController';

describe('useStore', () => {
  let mockController: StoreController<any>;
  let testStore: Store<number>;

  beforeEach(() => {
    testStore = new Store('TestStore', 0);
    mockController = {
      constructor: {
        stores: [testStore]
      },
      onTestStoreUpdate: jest.fn(),
      disconnect: jest.fn(),
      context: jest.fn(),
      application: jest.fn(),
      scope: jest.fn(),
      element: jest.fn(),
      // Add the other missing properties here...
    } as unknown as StoreController<any>;

    useStore(mockController);
  });

  it('should subscribe to stores and call update methods on value changes', () => {
    testStore.set(5);
    expect(mockController.onTestStoreUpdate).toHaveBeenCalledWith(5);
  });

  it('should allow direct access to store values on the controller', () => {
    testStore.set(10);
    expect(mockController.testStoreValue).toBe(10);
  });

  it('should allow direct access to store instances on the controller', () => {
    expect(mockController.testStore).toBe(testStore);
  });

  it('should clean up subscriptions when controller disconnects', () => {
    const unsubscribe = jest.spyOn(testStore, 'unsubscribe');
    mockController.disconnect();
    expect(unsubscribe).toHaveBeenCalled();
  });

  it('should add a getter for the store value to the controller', () => {
    testStore.set(7);
    expect(mockController.testStoreValue).toBe(7);
  });
  
  it('should add a getter for the store instance to the controller', () => {
    expect(mockController.testStore).toBe(testStore);
  });
  
  it('should add an update method to the controller', () => {
    mockController.updateTestStore(8);
    expect(mockController.onTestStoreUpdate).toHaveBeenCalledWith(8);
  });

  it('should notify each controller when the shared store\'s value is updated by any controller', () => {

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
      element: jest.fn(),
      // Add the other missing properties here...
    } as unknown as StoreController<any>;
    // Assume that the controllers have a method to update the store's value
    useStore(mockController2);
    mockController.updateTestStore = (value: any) => testStore.set(value);
    mockController2.updateTestStore = (value: any) => testStore.set(value);
  
    // Controller 1 updates the value and verifies that Controller 2 is notified
    mockController.updateTestStore(5);
    expect(mockController2.onTestStoreUpdate).toHaveBeenCalledWith(5);
    expect(mockController2.testStoreValue).toBe(5);
    expect(mockController2.testStore).toBe(testStore);
  
    // Controller 2 updates the value and verifies that Controller 1 is notified
    mockController2.updateTestStore(10);
    expect(mockController.onTestStoreUpdate).toHaveBeenCalledWith(10);
    expect(mockController.testStoreValue).toBe(10);
    expect(mockController.testStore).toBe(testStore);
  });

  it('should call the callback with the current value when a function is passed to set', () => {
    const callback = jest.fn().mockReturnValue(10);
    testStore.set(callback);
    expect(callback).toHaveBeenCalledWith(0);
    expect(testStore.get()).toBe(10);
  });
  
  it('should update the store\'s value with the return value of the callback', () => {
    const callback = jest.fn((currentValue) => currentValue + 5);
    testStore.set(callback);
    expect(testStore.get()).toBe(5);
  });
});
