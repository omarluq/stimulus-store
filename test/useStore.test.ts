import { Store } from '../src/store';
import { useStore } from '../src/useStore';

describe('useStore', () => {
  it('should subscribe to stores and call update methods on value changes', () => {
    const mockController = {
      onTestStoreUpdate: jest.fn(),
      disconnect: jest.fn(),
    };

    const testStore = new Store('TestStore', 0);
    useStore(mockController, [testStore]);

    testStore.set(5);
    expect(mockController.onTestStoreUpdate).toHaveBeenCalledWith(5);
  });

  it('should clean up subscriptions when controller disconnects', () => {
    const mockController = {
      onTestStoreUpdate: jest.fn(),
      disconnect: jest.fn(),
    };

    const testStore = new Store('TestStore', 0);
    useStore(mockController, [testStore]);

    mockController.disconnect();
    testStore.set(10);
    expect(mockController.onTestStoreUpdate).not.toHaveBeenCalledWith(10);
  });
});