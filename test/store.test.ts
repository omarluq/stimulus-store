import { Store } from '../src/store';

describe('Store', () => {
  let store: Store<number>;

  beforeEach(() => {
    store = new Store('testStore', 0);
  });

  it('should initialize with the correct value', () => {
    expect(store.get()).toBe(0);
  });

  it('should update the value correctly', () => {
    store.set(5);
    expect(store.get()).toBe(5);
  });

  it('should notify subscribers when value changes', () => {
    const mockCallback = jest.fn();
    store.subscribe(mockCallback);

    store.set(10);
    expect(mockCallback).toHaveBeenCalledWith(10);
  });

  it('should stop notifying unsubscribed callbacks', () => {
    const mockCallback = jest.fn();
    const unsubscribe = store.subscribe(mockCallback);

    unsubscribe();
    store.set(15);
    expect(mockCallback).not.toHaveBeenCalledWith(15);
  });

  it('should not notify subscribers when value is the same', () => {
    const mockCallback = jest.fn();
    store.subscribe(mockCallback);

    // Set the value to the same value
    // called only once cause the callback is invoked on subscription as well
    store.set(0);
    expect(mockCallback).not.toHaveBeenCalledWith(1);
  });

  it('should not notify subscribers when filter returns false', () => {
    const mockCallback = jest.fn();
    store.subscribe(mockCallback);

    store.set(20, { filter: () => false });
    expect(mockCallback).not.toHaveBeenCalledWith(20);
  });

  it('should call the callback with the current value when a function is passed to set', () => {
    const callback = jest.fn().mockImplementation(currentValue => currentValue + 10);
    store.set(callback);
    expect(callback).toHaveBeenCalledWith(0);
    expect(store.get()).toBe(10);
  });
});
